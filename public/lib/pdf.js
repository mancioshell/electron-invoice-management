const path = require('path')
const PDFDocument = require('pdfkit')

const publicDir = path.dirname(__dirname)
const logo = path.join(publicDir, 'gym-logo.png')

function generatePdf(i18next, settings, invoice) {
  let doc = new PDFDocument({ size: 'A4', margin: 50 })

  generateHeader(i18next, doc, settings)
  generateCustomerInformation(i18next, doc, invoice)

  let items = []

  let i,
    j,
    chunkArray,
    chunk = 10
  for (i = 0, j = invoice.services.length; i < j; i += chunk) {
    chunkArray = invoice.services.slice(i, i + chunk)
    items = [...items, chunkArray]
  }

  for (i = 0; i < items.length; i++) {
    let chunk = items[i]
    if (i > 0) doc.addPage()
    generateInvoiceTable(i18next, doc, chunk, invoice['taxstamp'], settings)
  }

  return doc
}

function generateHeader(
  i18next,
  doc,
  { brand, name, surname, address, city, cap, cf, piva }
) {
  doc
    .image(logo, 50, 45, { width: 100 })
    .fillColor('#444444')
    .fontSize(20)
    .text(brand, 170, 70)
    .fontSize(10)
    .text(`${name} ${surname}`, 200, 50, { align: 'right' })
    .text(`${address} ${city} ${cap}`, 200, 65, { align: 'right' })
    .font('Helvetica-Bold')
    .text(i18next.t('pdf.header.cf'), 420, 80)
    .font('Helvetica')
    .text(cf, 200, 80, { align: 'right' })
    .font('Helvetica-Bold')
    .text(i18next.t('pdf.header.piva'), 450, 95)
    .font('Helvetica')
    .text(piva, 200, 95, { align: 'right' })
    .moveDown()
}

function generateCustomerInformation(i18next, doc, invoice) {
  doc
    .fillColor('#444444')
    .fontSize(20)
    .text(i18next.t('pdf.customer.title'), 50, 160)

  generateHr(doc, 185)

  const customerInformationTop = 200

  doc
    .fontSize(10)
    .font('Helvetica-Bold')
    .text(i18next.t('pdf.invoice-number'), 50, customerInformationTop)
    .font('Helvetica')
    .text(invoice.number, 170, customerInformationTop)
    .font('Helvetica-Bold')

  doc
    .text(i18next.t('pdf.invoice-date'), 50, customerInformationTop + 15)
    .font('Helvetica')
    .text(formatDate(invoice.date), 170, customerInformationTop + 15)

  doc
    .font('Helvetica-Bold')
    .text(i18next.t('pdf.customer.name'), 250, customerInformationTop)
    .font('Helvetica')
    .text(`${invoice.customer.name}`, 360, customerInformationTop)
    .font('Helvetica-Bold')
    .text(i18next.t('pdf.customer.surname'), 250, customerInformationTop + 15)
    .font('Helvetica')
    .text(`${invoice.customer.surname}`, 360, customerInformationTop + 15)
    .font('Helvetica-Bold')
    .text(i18next.t('pdf.customer.address'), 250, customerInformationTop + 30)
    .font('Helvetica')
    .text(
      `${invoice.customer.address} ${invoice.customer.cap} ${invoice.customer.city}`,
      360,
      customerInformationTop + 30
    )
    .font('Helvetica-Bold')
    .text(i18next.t('pdf.customer.cf'), 250, customerInformationTop + 45)
    .font('Helvetica')
    .text(invoice.customer.cf, 360, customerInformationTop + 45)
    .font('Helvetica-Bold')
    .text(i18next.t('pdf.customer.piva'), 250, customerInformationTop + 60)
    .font('Helvetica')
    .text(invoice.customer.piva || '-', 360, customerInformationTop + 60)
    .moveDown()

  generateHr(doc, 280)
}

function generateInvoiceTable(i18next, doc, items, taxStamp, settings) {
  let i
  const invoiceTableTop = 400

  const hrLenght = 500

  const extractIva = (tot) => (tot * 100) / (100 + 4)

  const total = items.reduce((curr, next) => curr + next.price, 0)

  const totalIncome = extractIva(total)
  const totalIva = (totalIncome * 4) / 100

  const taxStampTreshold = settings['tax-stamp-treshold']

  doc
    .fillColor('#444444')
    .fontSize(20)
    .text(i18next.t('pdf.invoice-title'), 50, 330)
  generateHr(doc, 355)

  if (taxStamp) {
    doc
      .fontSize(10)
      .font('Helvetica-Bold')
      .text(i18next.t('pdf.invoice-tax-stamp-id'), 50, 370)
    doc.fontSize(10).font('Helvetica').text(taxStamp, 200, 370)
  }

  doc.font('Helvetica-Bold')
  generateTableRow(
    doc,
    invoiceTableTop,
    i18next.t('pdf.invoice-table-head-first'),
    i18next.t('pdf.invoice-table-head-second'),
    i18next.t('pdf.invoice-table-head-third'),
    i18next.t('pdf.invoice-table-head-fourth')
  )
  generateHr(doc, invoiceTableTop + 15, 50, hrLenght)

  doc.font('Helvetica')

  let position

  for (i = 0; i < items.length; i++) {
    const item = items[i]
    position = invoiceTableTop + (i + 1) * 20
    generateTableRow(doc, position, '', item.type, formatCurrency(item.price))
    generateHr(doc, position + 13, 50, hrLenght)
  }

  position = invoiceTableTop + (i + 1) * 20

  generateTableRow(doc, position, '', '', '', '')
  generateHr(doc, position + 13, 50, hrLenght)

  let j = i + 1

  let invoice = [
    { type: i18next.t('pdf.invoice-total'), amount: totalIncome },
    { type: i18next.t('pdf.invoice-iva'), amount: totalIva },
    { type: i18next.t('pdf.invoice-total-iva'), amount: totalIncome + totalIva },
    {
      type: i18next.t('pdf.invoice-tax-stamp'),
      amount: totalIncome > taxStampTreshold ? settings['tax-stamp-amount'] : '-'
    },
    {
      type: '',
      amount: ''
    },
    {
      type: i18next.t('pdf.invoice-total-tax-stamp'),
      amount:
      totalIncome +
        totalIva +
        (totalIncome > taxStampTreshold ? settings['tax-stamp-amount'] : 0)
    }
  ]

  for (i = 0; i < invoice.length; i++) {
    const item = invoice[i]
    position = invoiceTableTop + (j + 1) * 20
    generateTableRow(
      doc,
      position,
      item.type,
      '',
      '',
      formatCurrency(item.amount)
    )
    generateHr(doc, position + 13, 50, hrLenght)
    j++
  }

  let message = `${i18next.t('pdf.invoice-template-string-first')} ${
    settings['tax-stamp-amount']
  } ${i18next.t('pdf.invoice-template-string-second')} ${
    settings['tax-stamp-treshold']
  } ${i18next.t('pdf.invoice-template-string-third')}`

  doc.fontSize(8).text(message, 50, position + 28)

  doc.fontSize(8).text(i18next.t('pdf.invoice-note'), 50, position + 48)
}

function generateTableRow(
  doc,
  y,
  a,
  b,
  c = '',
  d = '',
  startA = 50,
  startB = 200,
  startC = 350,
  startD = 450
) {
  doc
    .fontSize(10)
    .text(a, startA, y)
    .text(b, startB, y)
    .text(c, startC, y)
    .text(d, startD, y)
}

function generateHr(doc, y, start = 50, end = 550) {
  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(start, y)
    .lineTo(end, y)
    .stroke()
}

function formatCurrency(currency) {
  return isNaN(parseFloat(currency))
    ? currency
    : `\u20AC ${currency.toFixed(2)}`
}

function formatDate(date) {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return year + '/' + month + '/' + day
}

module.exports.generatePdf = generatePdf
