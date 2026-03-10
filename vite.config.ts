import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import type { IncomingMessage, ServerResponse } from 'http';

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.otf': 'font/otf',
  '.pdf': 'application/pdf',
};

// Serve a static directory at a given URL prefix
function serveStaticDir(urlPrefix: string, dirName?: string): Plugin {
  const dir = path.resolve(__dirname, dirName || urlPrefix);

  return {
    name: `serve-${urlPrefix}`,
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || !req.url.startsWith(`/${urlPrefix}`)) return next();

        // Redirect /prefix to /prefix/
        if (req.url === `/${urlPrefix}`) {
          res.writeHead(302, { Location: `/${urlPrefix}/` });
          res.end();
          return;
        }

        const relativePath = req.url.replace(`/${urlPrefix}/`, '') || 'index.html';
        const cleanPath = relativePath.split('?')[0];
        const filePath = path.join(dir, decodeURIComponent(cleanPath));

        // Security: prevent path traversal
        if (!filePath.startsWith(dir)) return next();
        if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return next();

        const ext = path.extname(filePath);
        res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream');
        fs.createReadStream(filePath).pipe(res);
      });
    }
  };
}

// Puppeteer PDF generation endpoint
// Receives personalized HTML, renders with real Chromium, returns pixel-perfect PDF
function pdfApiPlugin(): Plugin {
  let browserInstance: any = null;

  return {
    name: 'pdf-api',
    configureServer(server) {
      // Reuse a single browser instance for performance
      const getBrowser = async () => {
        if (browserInstance && browserInstance.connected) return browserInstance;
        const puppeteer = await import('puppeteer');
        browserInstance = await puppeteer.default.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
        });
        return browserInstance;
      };

      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if (req.url !== '/api/generate-pdf' || req.method !== 'POST') return next();

        // Read request body
        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);
        const body = Buffer.concat(chunks).toString('utf-8');

        let html: string;
        try {
          const parsed = JSON.parse(body);
          html = parsed.html;
        } catch {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON body. Expected { html: "..." }' }));
          return;
        }

        if (!html) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing html field' }));
          return;
        }

        try {
          const browser = await getBrowser();
          const page = await browser.newPage();
          const port = server.config.server.port || 3004;
          const baseUrl = `http://localhost:${port}/salesdeck/`;

          // Set viewport to exact A4 landscape pixel dimensions
          await page.setViewport({ width: 1123, height: 794, deviceScaleFactor: 2 });

          // Navigate to salesdeck base first so relative URLs resolve correctly
          await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 5000 });

          // Inject <base> tag if not already present
          let processedHtml = html;
          if (!processedHtml.includes('<base ')) {
            processedHtml = processedHtml.replace(
              /<head([^>]*)>/,
              `<head$1><base href="${baseUrl}">`
            );
          }

          // Set the personalized content (relative paths now resolve via <base>)
          await page.setContent(processedHtml, {
            waitUntil: 'domcontentloaded',
            timeout: 10000,
          });

          // Wait for fonts to load (with timeout fallback)
          await Promise.race([
            page.evaluate(() => document.fonts.ready),
            new Promise(r => setTimeout(r, 5000)),
          ]);

          // Wait for all images to finish loading (with timeout fallback)
          await Promise.race([
            page.evaluate(async () => {
              const imgs = Array.from(document.querySelectorAll('img'));
              await Promise.all(imgs.map(img => {
                if (img.complete && img.naturalWidth > 0) return;
                return new Promise<void>(resolve => {
                  img.onload = () => resolve();
                  img.onerror = () => resolve();
                });
              }));
            }),
            new Promise(r => setTimeout(r, 5000)),
          ]);

          // Wait for rendering to settle
          await new Promise(r => setTimeout(r, 500));

          // Generate PDF with print background enabled
          const pdfBuffer = await page.pdf({
            format: 'A4',
            landscape: true,
            printBackground: true,
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
            preferCSSPageSize: true,
          });

          await page.close();

          res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Length': pdfBuffer.length.toString(),
          });
          res.end(pdfBuffer);
        } catch (err: any) {
          console.error('PDF generation error:', err);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message || 'PDF generation failed' }));
        }
      });

      // Cleanup browser on server close
      server.httpServer?.on('close', () => {
        if (browserInstance) {
          browserInstance.close().catch(() => {});
          browserInstance = null;
        }
      });
    }
  };
}

// Server-side website scraper endpoint
// Fetches a website's homepage and extracts text content (no CORS issues)
function scrapeApiPlugin(): Plugin {
  return {
    name: 'scrape-api',
    configureServer(server) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if (!req.url?.startsWith('/api/scrape?') || req.method !== 'GET') return next();

        const url = new URL(req.url, 'http://localhost');
        const domain = url.searchParams.get('domain');
        if (!domain) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Missing domain parameter' }));
          return;
        }

        try {
          // Try fetching the website server-side (no CORS)
          let html = '';
          const urls = [`https://www.${domain}`, `https://${domain}`];
          for (const fetchUrl of urls) {
            try {
              const controller = new AbortController();
              const timeout = setTimeout(() => controller.abort(), 8000);
              const resp = await fetch(fetchUrl, {
                signal: controller.signal,
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                  'Accept': 'text/html,application/xhtml+xml',
                  'Accept-Language': 'nl,en;q=0.9',
                },
                redirect: 'follow',
              });
              clearTimeout(timeout);
              if (resp.ok) {
                html = await resp.text();
                break;
              }
            } catch { /* try next URL */ }
          }

          if (!html) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ context: '' }));
            return;
          }

          // Extract useful text from HTML server-side
          // Remove script/style tags and their content
          html = html.replace(/<script[\s\S]*?<\/script>/gi, '');
          html = html.replace(/<style[\s\S]*?<\/style>/gi, '');
          html = html.replace(/<noscript[\s\S]*?<\/noscript>/gi, '');
          html = html.replace(/<svg[\s\S]*?<\/svg>/gi, '');

          // Extract title
          const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
          const title = titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : '';

          // Extract meta description
          const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i)
            || html.match(/<meta[^>]*content=["']([\s\S]*?)["'][^>]*name=["']description["']/i);
          const metaDesc = metaDescMatch ? metaDescMatch[1].replace(/\s+/g, ' ').trim() : '';

          // Extract OG description
          const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([\s\S]*?)["']/i)
            || html.match(/<meta[^>]*content=["']([\s\S]*?)["'][^>]*property=["']og:description["']/i);
          const ogDesc = ogDescMatch ? ogDescMatch[1].replace(/\s+/g, ' ').trim() : '';

          // Extract keywords
          const kwMatch = html.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([\s\S]*?)["']/i);
          const keywords = kwMatch ? kwMatch[1].replace(/\s+/g, ' ').trim() : '';

          // Strip all HTML tags to get body text
          let bodyText = html
            .replace(/<nav[\s\S]*?<\/nav>/gi, '')
            .replace(/<footer[\s\S]*?<\/footer>/gi, '')
            .replace(/<header[\s\S]*?<\/header>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#\d+;/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .substring(0, 2000);

          const parts: string[] = [];
          if (title) parts.push(`Paginatitel: ${title}`);
          if (metaDesc) parts.push(`Meta description: ${metaDesc}`);
          if (ogDesc && ogDesc !== metaDesc) parts.push(`OG description: ${ogDesc}`);
          if (keywords) parts.push(`Keywords: ${keywords}`);
          if (bodyText) parts.push(`Website tekst: ${bodyText}`);

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ context: parts.join('\n') }));
        } catch (err: any) {
          console.error('Scrape error for', domain, ':', err.message);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ context: '' }));
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3004,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        pdfApiPlugin(),
        scrapeApiPlugin(),
        serveStaticDir('samenvatting'),
        serveStaticDir('salesdeck'),
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
