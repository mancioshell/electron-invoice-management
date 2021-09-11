const { contextBridge, ipcRenderer } = require('electron')
const backend = require('i18next-electron-fs-backend')

const pdf = require('./pdf')

contextBridge.exposeInMainWorld('api', {
  insertSettings: async (newSettings) =>
    ipcRenderer.invoke('insertSettings', newSettings),
  getSettings: async () => ipcRenderer.invoke('getSettings'),
  getLastInvoiceNumber: async () => ipcRenderer.invoke('getLastInvoiceNumber'),
  getInvoiceList: async () => ipcRenderer.invoke('getInvoiceList'),
  getInvoiceById: async (id) => ipcRenderer.invoke('getInvoiceById', id),
  removeInvoice: async (invoice) =>
    ipcRenderer.invoke('removeInvoice', invoice),
  getCustomerById: async (id) => ipcRenderer.invoke('getCustomerById', id),
  getCustomerList: async () => ipcRenderer.invoke('getCustomerList'),
  getCustomerListSuggestions: async (query) =>
    ipcRenderer.invoke('getCustomerListSuggestions', query),
  insertCustomer: async (customer) =>
    ipcRenderer.invoke('insertCustomer', customer),
  insertInvoice: async (invoice) =>
    ipcRenderer.invoke('insertInvoice', invoice),
  printInvoice: async (invoiceId) => {
    let settings = await ipcRenderer.invoke('getSettings')
    let invoice = await ipcRenderer.invoke('getInvoiceById', invoiceId)

    let doc = pdf.generatePdf(settings, invoice)

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
  getAppVersion: async () => ipcRenderer.invoke('getAppVersion'),
  getAppLocale: async () => ipcRenderer.invoke('getAppLocale'),
  i18nextElectronBackend: backend.preloadBindings(ipcRenderer)
})

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
