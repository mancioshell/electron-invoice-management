const Datastore = require('nedb-promises')

module.exports = (i18next, userData) => {
  let invoices = Datastore.create(`${userData}/db/invoice.db`)
  let customers = Datastore.create(`${userData}/db/customers.db`)
  let settings = Datastore.create(`${userData}/db/settings.db`)

  return {
    insertSettings: async (newSettings) => {
      return settings.update({ id: 'settings' }, { ...newSettings })
    },
    getSettings: async () => {
      const initSettings = {
        id: 'settings',
        brand: i18next.t('settings.brand'),
        name: i18next.t('settings.name'),
        surname: i18next.t('settings.surname'),
        address: i18next.t('settings.address'),
        city: i18next.t('settings.city'),
        cap: i18next.t('settings.cap'),
        cf: i18next.t('settings.cf'),
        piva: i18next.t('settings.piva'),
        'tax-stamp-treshold': 77.47,
        'tax-stamp-amount': 2
      }

      let currentSettings = await settings.findOne({ id: 'settings' })
      if (!currentSettings)
        currentSettings = settings.insert({ ...initSettings })

      await invoices.ensureIndex({ fieldName: 'number', unique: true })
      return currentSettings
    },
    getLastInvoiceNumber: async () => {
      let invoiceList = await invoices.find()
      let lastInvoiceNumber = invoiceList.reduce(
        (curr, next) => Math.max(curr, next.number),
        0
      )
      return lastInvoiceNumber
    },
    getInvoiceList: async () => {
      let invoiceList = await invoices.find()

      let joinedList = []

      for (let invoice of invoiceList) {
        let customer = await customers.findOne({ _id: invoice.customer })
        joinedList = joinedList.concat([{ ...invoice, customer }])
      }

      return joinedList
    },
    getInvoiceById: async (id) => {
      let invoice = await invoices.findOne({ _id: id })
      let customer = await customers.findOne({ _id: invoice.customer })
      return { ...invoice, customer }
    },
    removeInvoice: async (invoice) => {
      return invoices.remove({ _id: invoice._id })
    },
    getCustomerById: async (id) => {
      return customers.findOne({ _id: id })
    },
    getCustomerList: async () => {
      return customers.find()
    },
    getCustomerListSuggestions: async (query) => {
      return customers.find({
        $or: [
          { name: new RegExp(query, 'gi') },
          { surname: new RegExp(query, 'gi') },
          { phone: new RegExp(query, 'gi') },
          { address: new RegExp(query, 'gi') }
        ]
      })
    },
    insertCustomer: async (customer) => {
      return customer._id
        ? customers.update({ _id: customer._id }, { ...customer })
        : customers.insert({ ...customer })
    },
    insertInvoice: async (invoice) => {
      let customer = invoice.customer
      let newCustomer = customer._id
        ? customer
        : await customers.insert(customer)

      if (customer._id) await customers.update({ _id: customer._id }, customer)

      if (invoice._id) {
        await invoices.update(
          { _id: invoice._id },
          {
            ...invoice,
            customer: newCustomer._id,
            updatedAt: new Date()
          }
        )
        return { ...invoice, customer: newCustomer }
      } else {
        let result = await invoices.insert({
          ...invoice,
          customer: newCustomer._id,
          createdAt: new Date()
        })
        return { ...invoice, customer: newCustomer, _id: result._id }
      }
    }
  }
}
