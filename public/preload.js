const { contextBridge, ipcRenderer } = require('electron')

const i18n = require('./i18n')
const fs = require('./lib/fs')
const db = require('./lib/db')

const init = async () => {
  let locale = await ipcRenderer.invoke('getAppLocale')
  let userData = await ipcRenderer.invoke('getUserData')

  let i18next = i18n.initI18Next(locale)

  let api = db(i18next, userData)

  return [api, i18next]
}

contextBridge.exposeInMainWorld('api', {
  insertSettings: async (newSettings) => {
    let [api] = await init()
    return api.insertSettings(newSettings)
  },
  getSettings: async () => {
    let [api] = await init()
    return api.getSettings()
  },
  getLastInvoiceNumber: async (date) => {
    let [api] = await init()
    return api.getLastInvoiceNumber(date)
  },

  getInvoiceList: async () => {
    let [api] = await init()
    return api.getInvoiceList()
  },
  getInvoiceById: async (id) => {
    let [api] = await init()
    return api.getInvoiceById(id)
  },
  removeInvoice: async (invoice) => {
    let [api] = await init()
    return api.removeInvoice(invoice)
  },
  insertInvoice: async (invoice) => {
    let [api] = await init()
    return api.insertInvoice(invoice)
  },
  printInvoice: async (invoiceId) => {
    let [api, i18next] = await init()
    let settings = await api.getSettings()
    let invoice = await api.getInvoiceById(invoiceId)

    fs.printInvoice(i18next, settings, invoice, invoiceId)
  },

  getCustomerById: async (id) => {
    let [api] = await init()
    return api.getCustomerById(id)
  },
  getCustomerList: async () => {
    let [api] = await init()
    return api.getCustomerList()
  },
  getCustomerListSuggestions: async (query) => {
    let [api] = await init()
    return api.getCustomerListSuggestions(query)
  },
  insertCustomer: async (customer) => {
    let [api] = await init()
    return api.insertCustomer(customer)
  },

  getAppVersion: async () => ipcRenderer.invoke('getAppVersion'),
  getAppLocale: async () => ipcRenderer.invoke('getAppLocale'),
  getLocalFile: fs.getLocalFile
})
