import { Form } from 'react-bootstrap'

import React, { useState, useEffect, useContext } from 'react'

import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import CustomerForm from 'Components/Customer/CustomerForm'
import SearchCustomerInput from 'Components/Customer/SearchCustomerInput'
import UIContext from 'Contexts/UIContext'

const SearchCustomerInputRef = React.forwardRef((props, ref) => {
  return <SearchCustomerInput {...props} forwardedRef={ref} />
})

const ref = React.createRef()

const initCustomer = {
  name: '',
  surname: '',
  address: '',
  cap: '',
  city: '',
  phone: '',
  email: '',
  cf: '',
  piva: ''
}

function InsertCustomer() {
  const { addMessage } = useContext(UIContext)

  const history = useHistory()
  const { t } = useTranslation(['insert-customer'])

  let { customerId } = useParams()
  const [customer, setCustomer] = useState(initCustomer)

  useEffect(() => {
    const getCurrentCustomer = async () => {
      let customer = await window?.api?.getCustomerById(customerId)
      setCustomer(customer)
    }

    if (customerId) getCurrentCustomer()
    if (!customerId) setCustomer(initCustomer)
  }, [customerId])

  const saveCustomer = async (customer, resetForm) => {
    await window?.api?.insertCustomer(customer)
    resetForm()
    history.push(`/customer-list`)

    addMessage({
      text: t('success-message'),
      type: t('success-message-title'),
      variant: 'success',
      show: true
    })
  }

  const onChangeCustomer = (customer) => {
    setCustomer((state) => {
      return { ...state, ...customer }
    })
  }

  return (
    <div id="container">
      <header className="mt-4">
        <h1>
          {' '}
          <i className="fas fa-pencil-alt"></i> {t('title')}
        </h1>
      </header>

      <section className="mt-5" id="formsContainer">
        <h3> Cliente </h3>

        <hr className="mt-2"></hr>

        <Form>
          <SearchCustomerInputRef
            ref={ref}
            onChangeCustomer={onChangeCustomer}></SearchCustomerInputRef>
        </Form>

        <CustomerForm
          customer={customer}
          saveCustomer={saveCustomer}></CustomerForm>
      </section>
    </div>
  )
}

export { InsertCustomer }

export default InsertCustomer
