/**
 * Generates a PDF using the browser's native print dialog.
 * Uses the browser's own rendering engine for perfect CSS support
 * including blur effects, backdrop-filter, CSS filters, and cross-origin images.
 *
 * The user selects "Save as PDF" in the print dialog.
 */
export async function generatePresentationPdf(): Promise<void> {
  // Use current viewport dimensions for exact 16:9 page sizing
  const w = window.innerWidth;
  const h = window.innerHeight;

  // Mark decorative blur circles for hiding (JS is more reliable than CSS attribute selectors)
  const blurElements: HTMLElement[] = [];
  document.querySelectorAll('div').forEach(el => {
    const cls = el.className;
    if (typeof cls === 'string' && cls.includes('blur-[')) {
      (el as HTMLElement).setAttribute('data-print-hide', '');
      blurElements.push(el as HTMLElement);
    }
  });

  // Inject print-specific styles
  const style = document.createElement('style');
  style.id = 'pdf-print-style';
  style.textContent = `
    @media print {
      @page {
        size: ${w}px ${h}px;
        margin: 0;
      }

      html, body {
        margin: 0 !important;
        padding: 0 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
      }

      /* Hide UI overlays */
      .fixed { display: none !important; }

      /* Hide decorative blur circles (marked by JS above) */
      [data-print-hide] { display: none !important; }

      /* Make ALL containers show full content */
      .relative, .snap-y, .no-scrollbar {
        height: auto !important;
        overflow: visible !important;
        scroll-snap-type: none !important;
      }

      /* Force all framer-motion animations to their final (visible) state */
      [style] {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
        animation: none !important;
      }

      /* Fix: Chrome print renders blurred box-shadows as ugly grey rectangles.
         Replace with a clean spread-only shadow (no blur = prints cleanly). */
      .snap-start * {
        box-shadow: none !important;
      }
      .snap-start [class*="shadow-"] {
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08) !important;
      }

      /* Each slide = one printed page, exact viewport dimensions */
      .snap-start {
        width: ${w}px !important;
        height: ${h}px !important;
        page-break-after: always !important;
        break-after: page !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }
      .snap-start:last-child {
        page-break-after: auto !important;
        break-after: auto !important;
      }

      /* Inner sections match exact page size */
      .snap-start > section {
        width: ${w}px !important;
        height: ${h}px !important;
      }

      /* ============================================================
         FORCE RESPONSIVE LAYOUTS
         Tailwind's md:/lg: breakpoints use @media (min-width: ...)
         which may not trigger in print context. Explicitly override.
         ============================================================ */

      /* --- Grid layouts --- */
      .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
      .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
      .md\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
      .lg\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
      .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }

      /* --- Text sizes (force desktop/tablet sizes) --- */
      .md\\:text-base { font-size: 1rem !important; line-height: 1.5rem !important; }
      .md\\:text-lg { font-size: 1.125rem !important; line-height: 1.75rem !important; }
      .md\\:text-xl { font-size: 1.25rem !important; line-height: 1.75rem !important; }
      .md\\:text-2xl { font-size: 1.5rem !important; line-height: 2rem !important; }
      .md\\:text-3xl { font-size: 1.875rem !important; line-height: 2.25rem !important; }
      .md\\:text-4xl { font-size: 2.25rem !important; line-height: 2.5rem !important; }
      .md\\:text-5xl { font-size: 3rem !important; line-height: 1 !important; }
      .md\\:text-6xl { font-size: 3.75rem !important; line-height: 1 !important; }
      .md\\:text-7xl { font-size: 4.5rem !important; line-height: 1 !important; }
      .md\\:text-8xl { font-size: 6rem !important; line-height: 1 !important; }
      .lg\\:text-5xl { font-size: 3rem !important; line-height: 1 !important; }
      .lg\\:text-6xl { font-size: 3.75rem !important; line-height: 1 !important; }
      .lg\\:text-7xl { font-size: 4.5rem !important; line-height: 1 !important; }

      /* Arbitrary text size (MissedOpportunities) */
      .md\\:text-\\[14rem\\] { font-size: 14rem !important; }

      /* --- Spacing --- */
      .md\\:p-12 { padding: 3rem !important; }
      .md\\:gap-6 { gap: 1.5rem !important; }
      .md\\:gap-8 { gap: 2rem !important; }

      /* --- Width & height --- */
      .md\\:w-10 { width: 2.5rem !important; }
      .md\\:w-16 { width: 4rem !important; }
      .md\\:w-20 { width: 5rem !important; }
      .md\\:w-24 { width: 6rem !important; }
      .md\\:w-32 { width: 8rem !important; }
      .md\\:w-56 { width: 14rem !important; }
      .md\\:h-16 { height: 4rem !important; }
      .md\\:h-18 { height: 4.5rem !important; }
      .md\\:h-20 { height: 5rem !important; }
      .md\\:h-24 { height: 6rem !important; }
      .md\\:h-56 { height: 14rem !important; }
      .lg\\:h-22 { height: 5.5rem !important; }
      .lg\\:h-24 { height: 6rem !important; }

      /* --- Flex & display --- */
      .md\\:items-start { align-items: flex-start !important; }
      .md\\:block { display: block !important; }
      .md\\:flex-row { flex-direction: row !important; }
    }
  `;
  document.head.appendChild(style);

  // Small delay for styles to apply
  await new Promise(r => setTimeout(r, 200));

  // Trigger the browser's print dialog
  window.print();

  // Clean up: remove styles and data attributes
  document.getElementById('pdf-print-style')?.remove();
  blurElements.forEach(el => el.removeAttribute('data-print-hide'));
}
