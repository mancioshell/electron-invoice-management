import { useState, useEffect } from 'react'

import { Alert, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import BlockUi from 'Components/Utils/BlockUI'

import InvoiceListTable from 'Components/Invoice/InvoiceListTable'

function InvoiceList() {
  const history = useHistory()
  const { t } = useTranslation(['invoice-list'])

  const [invoiceList, setInvoiceList] = useState([])

  useEffect(() => {
    const getInvoiceList = async () => {
      let invoices = await window?.api?.getInvoiceList()
      setInvoiceList(invoices || [])
    }

    getInvoiceList()
  }, [])

  const insertInvoice = (e) => {
    e.preventDefault()
    history.push(`/insert-invoice`)
  }

  const updateInvoice = (e, invoice) => {
    e.preventDefault()
    history.push(`/update-invoice/${invoice._id}`)
  }

  const readInvoice = (e, invoice) => {
    e.preventDefault()
    history.push(`/invoice/${invoice._id}`)
  }

  const removeInvoice = async (e, invoice) => {
    e.preventDefault()
    await window?.api?.removeInvoice(invoice)
    setInvoiceList(invoiceList.filter((item) => item._id !== invoice._id))
  }

  const printInvoice = async (invoice) => {
    await window?.api?.printInvoice(invoice._id)
  }

  const printEInvoice = async (invoice) => {
    await window?.api?.printEInvoice(invoice._id)
  }

  return (
    <div className="mt-4">
      <h1>
        {' '}
        <i className="fas fa-clipboard-list"></i> {t('title')}
      </h1>

      {invoiceList.length > 0 ? (
        <BlockUi>
          <InvoiceListTable
            invoiceList={invoiceList}
            updateInvoice={updateInvoice}
            removeInvoice={removeInvoice}
            readInvoice={readInvoice}
            printInvoice={printInvoice}
            printEInvoice={printEInvoice}></InvoiceListTable>
        </BlockUi>
      ) : (
        <Alert variant="primary" className="mt-5">
          <Alert.Heading>{t('alert-heading')}</Alert.Heading>
          <p>{t('alert-body')}</p>

          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={insertInvoice} variant="outline-primary">
              <i className="fas fa-plus"></i> {t('alert-button')}
            </Button>
          </div>
        </Alert>
      )}
    </div>
  )
}

export { InvoiceList }

export default InvoiceList
