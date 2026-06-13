const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

const BRAND = '#006071';
const MARGIN = 50;
const PAGE_WIDTH = 595.28; // A4
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const safeName = (product) => {
  const base = product.model || product.slug || 'product';
  return `${String(base).replace(/[^a-z0-9.-]+/gi, '_')}_Datasheet.pdf`;
};

const resolveLocalImage = (imageUrl) => {
  if (!imageUrl || typeof imageUrl !== 'string') return null;
  if (imageUrl.startsWith('/uploads/')) {
    const filePath = path.join(__dirname, '..', imageUrl.replace(/^\//, ''));
    if (fs.existsSync(filePath)) return filePath;
  }
  const match = imageUrl.match(/\/uploads\/[^/?#]+/);
  if (match) {
    const filePath = path.join(__dirname, '..', match[0].replace(/^\//, ''));
    if (fs.existsSync(filePath)) return filePath;
  }
  return null;
};

const ensureSpace = (doc, needed = 40) => {
  if (doc.y + needed > doc.page.height - 60) {
    doc.addPage();
    drawPageFooter(doc);
    doc.y = MARGIN;
  }
};

const drawPageFooter = (doc) => {
  const y = doc.page.height - 40;
  doc
    .fontSize(8)
    .fillColor('#888888')
    .text('www.nexyos.com  |  Nexyos Product Data Sheet', MARGIN, y, {
      width: CONTENT_WIDTH,
      align: 'center',
    });
};

const drawHeader = (doc, product) => {
  doc.rect(0, 0, doc.page.width, 56).fill(BRAND);
  doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(20).text('NEXYOS', MARGIN, 18);
  doc.fontSize(9).text('DATA SHEET', MARGIN, 18, {
    width: CONTENT_WIDTH,
    align: 'right',
  });
  doc.y = 72;
};

const drawSectionTitle = (doc, title) => {
  ensureSpace(doc, 36);
  doc
    .moveDown(0.6)
    .font('Helvetica-Bold')
    .fontSize(11)
    .fillColor(BRAND)
    .text(title.toUpperCase(), MARGIN, doc.y, { width: CONTENT_WIDTH });
  doc
    .moveDown(0.2)
    .strokeColor(BRAND)
    .lineWidth(1)
    .moveTo(MARGIN, doc.y)
    .lineTo(MARGIN + CONTENT_WIDTH, doc.y)
    .stroke();
  doc.moveDown(0.5);
};

const drawBulletList = (doc, items) => {
  doc.font('Helvetica').fontSize(9).fillColor('#333333');
  for (const item of items) {
    ensureSpace(doc, 20);
    const bulletY = doc.y;
    doc.circle(MARGIN + 4, bulletY + 4, 2).fill('#333333');
    doc.text(item, MARGIN + 14, bulletY, { width: CONTENT_WIDTH - 14, lineGap: 2 });
    doc.moveDown(0.15);
  }
};

const drawSpecTable = (doc, rows) => {
  const labelWidth = CONTENT_WIDTH * 0.38;
  const valueWidth = CONTENT_WIDTH * 0.62;

  doc.font('Helvetica').fontSize(8.5);

  for (const row of rows) {
    ensureSpace(doc, 22);
    const startY = doc.y;

    doc.fillColor('#555555').font('Helvetica-Bold');
    doc.text(row.label || '—', MARGIN, startY, { width: labelWidth, lineGap: 1 });

    doc.fillColor('#222222').font('Helvetica');
    doc.text(row.value || '—', MARGIN + labelWidth, startY, { width: valueWidth, lineGap: 1 });

    const labelH = doc.heightOfString(row.label || '—', { width: labelWidth });
    const valueH = doc.heightOfString(row.value || '—', { width: valueWidth });
    doc.y = startY + Math.max(labelH, valueH) + 6;

    doc
      .strokeColor('#eeeeee')
      .lineWidth(0.5)
      .moveTo(MARGIN, doc.y - 3)
      .lineTo(MARGIN + CONTENT_WIDTH, doc.y - 3)
      .stroke();
  }
};

function generateDataSheetPdf(product, stream) {
  const doc = new PDFDocument({ size: 'A4', margin: MARGIN, bufferPages: true });
  doc.pipe(stream);

  drawHeader(doc, product);

  const localImage = resolveLocalImage(product.image);
  const titleY = doc.y;

  if (localImage) {
    try {
      doc.image(localImage, PAGE_WIDTH - MARGIN - 110, titleY, {
        fit: [100, 100],
        align: 'right',
      });
    } catch {
      /* skip broken image */
    }
  }

  doc
    .font('Helvetica-Bold')
    .fontSize(16)
    .fillColor('#111111')
    .text(product.title || 'Product', MARGIN, titleY, {
      width: localImage ? CONTENT_WIDTH - 120 : CONTENT_WIDTH,
    });

  doc.moveDown(0.4);
  if (product.model) {
    doc.font('Helvetica-Bold').fontSize(11).fillColor(BRAND).text(`Model: ${product.model}`);
  }

  if (product.description) {
    doc.moveDown(0.5);
    doc.font('Helvetica').fontSize(9).fillColor('#444444').text(product.description, {
      width: CONTENT_WIDTH,
      lineGap: 2,
    });
  }

  const features =
    Array.isArray(product.keyFeatures) && product.keyFeatures.length > 0
      ? product.keyFeatures
      : product.description
        ? [product.description]
        : [];

  if (features.length > 0) {
    drawSectionTitle(doc, 'Key Features');
    drawBulletList(doc, features);
  }

  if (Array.isArray(product.variants) && product.variants.length > 0) {
    drawSectionTitle(doc, 'Available Models');
    doc.font('Helvetica').fontSize(9).fillColor('#333333');
    doc.text(product.variants.join(', '), MARGIN, doc.y, { width: CONTENT_WIDTH });
    doc.moveDown(0.5);
  }

  const specs = product.specifications || {};
  const groups = Object.keys(specs);

  if (groups.length > 0) {
    drawSectionTitle(doc, 'Specifications');
    for (const group of groups) {
      ensureSpace(doc, 50);
      doc.font('Helvetica-Bold').fontSize(10).fillColor('#222222').text(group, MARGIN, doc.y);
      doc.moveDown(0.35);
      const rows = Array.isArray(specs[group]) ? specs[group] : [];
      drawSpecTable(doc, rows);
      doc.moveDown(0.4);
    }
  }

  if (Array.isArray(product.featureIcons) && product.featureIcons.length > 0) {
    drawSectionTitle(doc, 'Technologies');
    doc.font('Helvetica').fontSize(9).fillColor('#333333');
    doc.text(product.featureIcons.join('  •  '), MARGIN, doc.y, { width: CONTENT_WIDTH });
  }

  doc.moveDown(1);
  doc.font('Helvetica').fontSize(8).fillColor('#888888');
  doc.text(
    `Generated ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}  |  For the latest information visit www.nexyos.com`,
    MARGIN,
    doc.y,
    { width: CONTENT_WIDTH, align: 'center' }
  );

  const pages = doc.bufferedPageRange();
  for (let i = 0; i < pages.count; i++) {
    doc.switchToPage(i);
    drawPageFooter(doc);
  }

  doc.end();
}

module.exports = { generateDataSheetPdf, safeName };
