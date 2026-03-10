const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Load the HTML file
  const htmlPath = path.join(__dirname, 'index.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  // Set viewport for landscape
  await page.setViewport({ width: 1920, height: 1080 });

  // Generate PDF
  await page.pdf({
    path: path.join(__dirname, 'Zwarte-Kraai-Presentatie.pdf'),
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  console.log('PDF generated: Zwarte-Kraai-Presentatie.pdf');
  await browser.close();
})();
