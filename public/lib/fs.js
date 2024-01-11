const fs = require('fs')
const pdf = require('./pdf')
const xml = require('./xml')

const path = require('path')

module.exports = {
  getLocalFile: async (language, namespace, callback) => {
    let fileName = path.join(
      __dirname,
      `../../build/locales/${language}/${namespace}.json`
    )
    fs.readFile(fileName, 'utf8', callback)
  },
  printInvoice: (i18next, settings, invoice, invoiceId) => {
    let doc = pdf.generatePdf(i18next, settings, invoice)

    const fileName = `invoice-${invoiceId}.pdf`

    let buffers = []

    doc.on('data', buffers.push.bind(buffers))
    doc.on('end', () => {
      let data = Buffer.concat(buffers)

      const element = document.createElement('a')
      const file = new Blob([data], { type: 'application/pdf' })
      element.href = URL.createObjectURL(file)
      element.download = fileName
      element.click()
    })

    doc.end()
  },
  printEInvoice: (settings, invoice, invoiceId) => {
    let data = xml.generateXml(settings, invoice)

    const fileName = `invoice-${invoiceId}.xml`

    const element = document.createElement('a')
    const file = new Blob([data], { type: 'application/xml' })
    element.href = URL.createObjectURL(file)
    element.download = fileName
    element.click()
  }
}
