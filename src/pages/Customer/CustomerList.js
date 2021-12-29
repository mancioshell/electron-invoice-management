import { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import CustomerListTable from 'components/Customer/CustomerListTable'

function CustomerList() {
  const history = useHistory()
  const { t } = useTranslation(['customer-list'])

  const [customerList, setCustomerList] = useState([])

  useEffect(() => {
    const getCustomerList = async () => {
      let customers = await window?.api?.getCustomerList()
      setCustomerList(customers || [])
    }

    getCustomerList()
  }, [])

  const updateCustomer = (customer) => {
    history.push(`/update-customer/${customer._id}`)
  }

  const createInvoice = async (customer) => {
    history.push(`/insert-invoice/customer/${customer._id}`)
  }

  return (
    <div className="mt-4">
      <h1>
        {' '}
        <i className="fas fa-users"></i> {t('title')}
      </h1>

      {customerList.length > 0 ? (
        <CustomerListTable
          customerList={customerList}
          updateCustomer={updateCustomer}
          createInvoice={createInvoice}></CustomerListTable>
      ) : (
        <Alert variant="primary" className="mt-5">
          <Alert.Heading>{t('alert-heading')}</Alert.Heading>
          <p>{t('alert-body')}</p>
        </Alert>
      )}
    </div>
  )
}

export { CustomerList }

export default CustomerList
