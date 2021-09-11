import React from 'react'

import { waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import InvoiceForm from 'components/Invoice/InvoiceForm'
import SettingsContext from 'context/SettingsContext'
import userEvent from '@testing-library/user-event'
import selectEvent from 'react-select-event'

import i18NextCustomRender from '../../i18n.test'
import invoiceFormConfig from '../../../public/locales/it/invoice-form.json'
import customerConfig from '../../../public/locales/it/customer-form.json'
import invoiceServiceFormConfig from '../../../public/locales/it/invoice-service-form.json'

const customRender = (ui, renderOptions) => {
  const config = {
    ...customerConfig,
    ...invoiceServiceFormConfig,
    ...invoiceFormConfig,
    button: {
      ...customerConfig.button,
      ...invoiceServiceFormConfig.button,
      ...invoiceFormConfig.button
    }
  }

  return i18NextCustomRender(ui, { ...config }, renderOptions)
}

const SettingsProvider = ({ children }) => {
  return (
    <SettingsContext.Provider
      value={{
        settings: {
          'tax-stamp-treshold': 77.47,
          'tax-stamp-amount': 2
        }
      }}>
      {children}
    </SettingsContext.Provider>
  )
}

let currentDate = new Date()

let invoice = {
  customer: {
    name: '',
    surname: '',
    address: '',
    cap: '',
    city: '',
    phone: '',
    email: '',
    cf: '',
    piva: ''
  },
  date: currentDate,
  number: 1,
  taxstamp: '',
  services: [
    {
      type: '',
      price: 0
    }
  ]
}

let newInvoice = {
  customer: {
    name: 'John',
    surname: 'Doe',
    address: 'Trafalgar Square',
    cap: '22331',
    city: 'London',
    phone: '+44 7911 123456',
    email: 'john.doe@gmail.com',
    cf: 'JHNDOE72E04H501T',
    piva: ''
  },
  date: currentDate,
  number: 1,
  taxstamp: '',
  services: [
    {
      type: 'Training',
      price: 35
    }
  ]
}

let saveInvoice, searchCustomerInput

beforeEach(() => {
  saveInvoice = jest.fn()
  searchCustomerInput = jest.fn()
})

afterEach(() => {
  saveInvoice.mockRestore()
  searchCustomerInput.mockRestore()
})

const compileCustomerForm = (customer) => {
  userEvent.type(screen.getByLabelText(/Nome/), customer.name)
  userEvent.type(screen.getByLabelText(/Cognome/), customer.surname)
  userEvent.type(screen.getByLabelText(/Indirizzo \*/), customer.address)
  userEvent.type(screen.getByLabelText(/Cap \*/), customer.cap)
  userEvent.type(screen.getByLabelText(/Città \*/), customer.city)
  userEvent.type(
    screen.getByLabelText(/Recapito Telefonico \*/),
    customer.phone
  )
  userEvent.type(screen.getByLabelText(/Email/), customer.email)
  userEvent.type(screen.getByLabelText(/Codice Fiscale/), customer.cf)
}

test('submitting a InvoiceForm when click Save button', async () => {
  customRender(
    <SettingsProvider>
      <InvoiceForm
        invoice={invoice}
        saveInvoice={saveInvoice}
        searchCustomerInput={searchCustomerInput}
      />
    </SettingsProvider>
  )

  compileCustomerForm(newInvoice.customer)

  userEvent.type(
    screen.getByLabelText(/Prestazione/),
    newInvoice.services[0].type
  )
  userEvent.type(
    screen.getByLabelText(/Importo \*/),
    newInvoice.services[0].price.toString()
  )

  await userEvent.click(screen.getByRole('button', { name: /Salva/ }))

  await waitFor(() => {
    expect(saveInvoice).toHaveBeenCalledWith(newInvoice, expect.anything())
  })
})

test('submitting InvoiceForm with two services', async () => {
  const currentInvoice = {
    ...newInvoice,
    services: [
      ...newInvoice.services,
      {
        type: 'Consulting',
        price: 20
      }
    ]
  }

  customRender(
    <SettingsProvider>
      <InvoiceForm
        invoice={invoice}
        saveInvoice={saveInvoice}
        searchCustomerInput={searchCustomerInput}
      />
    </SettingsProvider>
  )

  compileCustomerForm(newInvoice.customer)

  userEvent.type(
    screen.getByLabelText(/Prestazione/),
    currentInvoice.services[0].type
  )
  userEvent.type(
    screen.getByLabelText(/Importo \*/),
    currentInvoice.services[0].price.toString()
  )

  await userEvent.click(screen.getByRole('button', { name: /Aggiungi/ }))

  userEvent.clear(screen.getAllByLabelText(/Importo/)[1])

  userEvent.type(
    screen.getAllByLabelText(/Prestazione/)[1],
    currentInvoice.services[1].type
  )
  userEvent.type(
    screen.getAllByLabelText(/Importo \*/)[1],
    currentInvoice.services[1].price.toString()
  )

  userEvent.click(screen.getByRole('button', { name: /Salva/ }))

  await waitFor(() => {
    expect(saveInvoice).toHaveBeenCalledWith(currentInvoice, expect.anything())
  })
})

test('submitting InvoiceForm which exceeds tax theshold', async () => {
  const currentInvoice = {
    ...newInvoice,
    services: [
      ...newInvoice.services,
      {
        type: 'Consulting',
        price: 50
      }
    ]
  }

  customRender(
    <SettingsProvider>
      <InvoiceForm
        invoice={invoice}
        saveInvoice={saveInvoice}
        searchCustomerInput={searchCustomerInput}
      />
    </SettingsProvider>
  )

  compileCustomerForm(newInvoice.customer)

  userEvent.type(
    screen.getByLabelText(/Prestazione/),
    currentInvoice.services[0].type
  )
  userEvent.type(
    screen.getByLabelText(/Importo \*/),
    currentInvoice.services[0].price.toString()
  )

  await userEvent.click(screen.getByRole('button', { name: /Aggiungi/ }))

  userEvent.clear(screen.getAllByLabelText(/Importo/)[1])

  userEvent.type(
    screen.getAllByLabelText(/Prestazione/)[1],
    currentInvoice.services[1].type
  )
  userEvent.type(
    screen.getAllByLabelText(/Importo \*/)[1],
    currentInvoice.services[1].price.toString()
  )

  userEvent.click(screen.getByRole('button', { name: /Salva/ }))

  await waitFor(() => {
    expect(saveInvoice).not.toHaveBeenCalled()
    expect(screen.getByLabelText(/Identificativo Marca da Bollo/)).toHaveClass(
      'is-invalid'
    )
  })
})

test('submitting InvoiceForm with tax stamp', async () => {
  const currentInvoice = {
    ...newInvoice,
    services: [
      ...newInvoice.services,
      {
        type: 'Consulting',
        price: 50
      }
    ],
    taxstamp: '12345678910112'
  }

  customRender(
    <SettingsProvider>
      <InvoiceForm
        invoice={invoice}
        saveInvoice={saveInvoice}
        searchCustomerInput={searchCustomerInput}
      />
    </SettingsProvider>
  )

  compileCustomerForm(newInvoice.customer)

  userEvent.type(
    screen.getByLabelText(/Prestazione/),
    currentInvoice.services[0].type
  )
  userEvent.type(
    screen.getByLabelText(/Importo \*/),
    currentInvoice.services[0].price.toString()
  )

  await userEvent.click(screen.getByRole('button', { name: /Aggiungi/ }))

  userEvent.clear(screen.getAllByLabelText(/Importo/)[1])

  userEvent.type(
    screen.getAllByLabelText(/Prestazione/)[1],
    currentInvoice.services[1].type
  )
  userEvent.type(
    screen.getAllByLabelText(/Importo \*/)[1],
    currentInvoice.services[1].price.toString()
  )

  userEvent.type(
    screen.getByLabelText(/Identificativo Marca da Bollo \*/),
    currentInvoice.taxstamp
  )

  userEvent.click(screen.getByRole('button', { name: /Salva/ }))

  await waitFor(() => {
    expect(saveInvoice).toHaveBeenCalledWith(currentInvoice, expect.anything())
  })
})
