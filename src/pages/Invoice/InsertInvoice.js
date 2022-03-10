import React, { useState, useEffect, useContext } from 'react'

import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import UIContext from 'Contexts/UIContext'
import InvoiceForm from 'Components/Invoice/InvoiceForm'
import SearchCustomerInput from 'Components/Customer/SearchCustomerInput'

const SearchCustomerInputRef = React.forwardRef((props, ref) => {
  return <SearchCustomerInput {...props} forwardedRef={ref} />
})

const ref = React.createRef()

const initInvoice = {
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
  date: new Date(),
  number: 0,
  taxstamp: '',
  services: [
    {
      type: '',
      price: 0
    }
  ]
}

function InsertInvoice() {
  const history = useHistory()
  const { addMessage } = useContext(UIContext)
  const { t } = useTranslation(['insert-invoice'])
  let { id, customerId } = useParams()

  const [invoice, setInvoice] = useState(initInvoice)

  useEffect(() => {
    const getCurrentInvoice = async () => {
      let currentInvoice = await window?.api?.getInvoiceById(id)
      setInvoice(currentInvoice)
    }

    const getCurrentCustomer = async () => {
      let customer = await window?.api?.getCustomerById(customerId)
      setInvoice((invoice) => ({ ...invoice, customer }))
    }

    const getLastInvoiceNumber = async () => {
      let lastInvoiceNumber = await window?.api?.getLastInvoiceNumber()     
      setInvoice((invoice) => ({
        ...invoice,
        number: lastInvoiceNumber + 1
      }))
    }

    if (id) getCurrentInvoice() // edit invoice
    if (!id) getLastInvoiceNumber() // if is a new invoice, get last invoice number
    if (customerId) getCurrentCustomer() // new invoice with existing customer
  }, [id, customerId])

  const saveInvoice = async (savedInvoice, resetForm) => {    
    try {
      await window?.api?.insertInvoice(savedInvoice)

      if (id) history.push(`/invoice-list`) // if i have edited an invoice, come back to invoice-list

      if (!id) {
        resetForm({...initInvoice, number: savedInvoice.number + 1})
        ref.current.clear()
      }

      addMessage({
        text: t('success-save-message'),
        type: t('success-save-message-title'),
        variant: 'success',
        show: true
      })
    } catch (error) {
      addMessage({
        text: t('error-save-message'),
        type: t('error-save-message-title'),
        variant: 'danger',
        show: true
      })

      resetForm()
    }
  }

  return (
    <div id="container">
      <header className="mt-4">
        <h1>
          {' '}
          {id ? (
            <>
              <i className="fas fa-pencil-alt"></i> {t('modify-title')}
            </>
          ) : (
            <>
              <i className="fas fa-plus"></i> {t('insert-title')}
            </>
          )}{' '}
        </h1>
      </header>

      <section className="mt-5" id="formsContainer">
        <h3>
          <i className="fas fa-user"></i> {t('title')}
        </h3>

        <hr className="mt-2"></hr>

        <InvoiceForm
          invoice={invoice}
          saveInvoice={saveInvoice}
          searchCustomerInput={(formik) => {
            return (
              <SearchCustomerInputRef
                ref={ref}
                onChangeCustomer={(customer) =>
                  formik.setFieldValue('customer', customer)
                }
              />
            )
          }}
        />
      </section>
    </div>
  )
}

export { InsertInvoice }

export default InsertInvoice
