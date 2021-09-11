const path = require('path')
const PDFDocument = require('pdfkit')

const publicDir = path.dirname(__dirname)
const logo = path.join(publicDir, 'gym-logo.png')

function generatePdf(settings, invoice) {
  let doc = new PDFDocument({ size: 'A4', margin: 50 })

  generateHeader(doc, settings)
  generateCustomerInformation(doc, invoice)

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
    generateInvoiceTable(doc, chunk, invoice['tax-stamp'], settings)
    generateFooter(doc)
  }

  return doc
}

function generateHeader(
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
    .text('CF: ', 420, 80)
    .font('Helvetica')
    .text(cf, 200, 80, { align: 'right' })
    .font('Helvetica-Bold')
    .text('PIVA: ', 450, 95)
    .font('Helvetica')
    .text(piva, 200, 95, { align: 'right' })
    .moveDown()
}

function generateCustomerInformation(doc, invoice) {
  doc.fillColor('#444444').fontSize(20).text('Cliente', 50, 160)

  generateHr(doc, 185)

  const customerInformationTop = 200

  doc
    .fontSize(10)
    .font('Helvetica-Bold')
    .text('Numero Fattura:', 50, customerInformationTop)
    .font('Helvetica')
    .text(invoice.number, 170, customerInformationTop)
    .font('Helvetica-Bold')

  doc
    .text('Data Fattura:', 50, customerInformationTop + 15)
    .font('Helvetica')
    .text(formatDate(invoice.date), 170, customerInformationTop + 15)

  doc
    .font('Helvetica-Bold')
    .text('Nome:', 250, customerInformationTop)
    .font('Helvetica')
    .text(`${invoice.customer.name}`, 360, customerInformationTop)
    .font('Helvetica-Bold')
    .text('Cognome:', 250, customerInformationTop + 15)
    .font('Helvetica')
    .text(`${invoice.customer.surname}`, 360, customerInformationTop + 15)
    .font('Helvetica-Bold')
    .text('Indirizzo:', 250, customerInformationTop + 30)
    .font('Helvetica')
    .text(
      `${invoice.customer.address} ${invoice.customer.cap} ${invoice.customer.city}`,
      360,
      customerInformationTop + 30
    )
    .font('Helvetica-Bold')
    .text('Codice Fiscale:', 250, customerInformationTop + 45)
    .font('Helvetica')
    .text(invoice.customer.cf, 360, customerInformationTop + 45)
    .font('Helvetica-Bold')
    .text('Partita Iva:', 250, customerInformationTop + 60)
    .font('Helvetica')
    .text(invoice.customer.piva || '-', 360, customerInformationTop + 60)
    .moveDown()

  generateHr(doc, 280)
}

function generateInvoiceTable(doc, items, taxStamp, settings) {
  let i
  const invoiceTableTop = 400

  const hrLenght = 500

  const total = items.reduce((curr, next) => curr + next.price, 0)
  const iva = (total * 4) / 100

  const taxStampTreshold = settings['tax-stamp-treshold']

  doc.fillColor('#444444').fontSize(20).text('Fattura', 50, 330)
  generateHr(doc, 355)

  if(taxStamp) {
    doc.fontSize(10).font('Helvetica-Bold').text('Identificativo Marca da Bollo : ', 50, 370)
    doc.fontSize(10).font('Helvetica').text(taxStamp, 200, 370)
  }

  doc.font('Helvetica-Bold')
  generateTableRow(
    doc,
    invoiceTableTop,
    'Voci Fattura',
    'Prestazione',
    'Imponibile',
    'Importo'
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
    { type: 'Totale Imponibile', amount: total },
    { type: 'Rivalsa previdenziale Inps 4%', amount: iva },
    { type: 'Totale Fattura', amount: total + iva },
    {
      type: 'Marca da Bollo *',
      amount: total > taxStampTreshold ? settings['tax-stamp-amount'] : '-'
    },
    {
      type: '',
      amount: ''
    },
    {
      type: 'Totale a Pagare',
      amount:
        total +
        iva +
        (total > taxStampTreshold ? settings['tax-stamp-amount'] : 0)
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

  doc
    .fontSize(8)
    .text(
      '* Imposta di bollo di 2,00 assolta sull’originale se l’importo del compenso lordo della presente fattura è superiore a 77,47 euro.',
      50,
      position + 28
    )

  doc
    .fontSize(8)
    .text(
      "Si informa che la presente fattura, emessa in duplice copia è soggetta al nuovo regime forfettario di cui all’art. 1, c. 54-89 L. 190/2014 e, pertanto, non viene addebitata l'imposta sul valore aggiunto a titolo di rivalsa e non è soggetta a ritenuta d'acconto.",
      50,
      position + 48
    )
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      `Questa fattura è stata generata il ${new Date().toLocaleDateString()} alle ore ${new Date().toLocaleTimeString()}`,
      50,
      780,
      { align: 'center', width: 500 }
    )
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
