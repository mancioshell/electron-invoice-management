import { Card, Button } from 'react-bootstrap'
import React, { useState, useEffect, useContext } from 'react'

import { useParams, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import BlockUi from 'Components/Utils/BlockUI'

import SettingsContext from 'Contexts/SettingsContext'

import InvoiceResumeTable from 'Components/Invoice/InvoiceResumeTable'

import useInvoiceEntry from 'Hooks/useInvoiceEntry'

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

function Invoice() {
  let { id } = useParams()

  const history = useHistory()
  const { t } = useTranslation(['invoice'])

  const [invoice, setInvoice] = useState(initInvoice)

  const { settings } = useContext(SettingsContext)

  const taxStampTreshold = settings['tax-stamp-treshold']
  const taxStampAmount = settings['tax-stamp-amount']

  useEffect(() => {
    const getCurrentInvoice = async () => {
      let currentInvoice = await window?.api?.getInvoiceById(id)
      setInvoice(currentInvoice)
    }

    getCurrentInvoice()
  }, [id])

  const invoiceEntry = useInvoiceEntry(
    invoice.services || [],
    taxStampTreshold,
    taxStampAmount
  )

  const printReceipt = async () => {
    await window?.api?.printInvoice(invoice._id)
  }

  const invoiceList = (e) => {
    e.preventDefault()
    history.push('/invoice-list')
  }

  return (
    <BlockUi>
      <Card border="secondary">
        <Card.Header as="h5">
          <i className="fas fa-file-invoice"></i> {t('label.invoice-number')}:
          {invoice.number}
        </Card.Header>
        <Card.Body>
          <Card.Title>
            {invoice.customer.name} {invoice.customer.surname}
          </Card.Title>

          <Card.Subtitle className="mb-2 text-muted">
            {invoice.customer.cf}
            {invoice.customer.piva ? ` - ${invoice.customer.piva}` : null}
          </Card.Subtitle>

          <Card.Text className="mt-4">
            <strong>{t('label.address')}:</strong> {invoice.customer.address} -{' '}
            {invoice.customer.cap} - {invoice.customer.city}
          </Card.Text>
          <Card.Text>
            <strong>{t('label.phone')}:</strong> {invoice.customer.phone}
          </Card.Text>

          <hr />

          <Card.Text as="h4" className="mt-5 mb-3">
            <strong>{t('label.invoice-resume')}:</strong>
          </Card.Text>

          <InvoiceResumeTable invoiceEntry={invoiceEntry}></InvoiceResumeTable>

          <hr />

          <Button className="mr-2 mb-2" variant="info" onClick={printReceipt}>
            <i className="fas fa-print"></i> {t('button.print')}
          </Button>
          <Button className="mr-2 mb-2" variant="primary" onClick={invoiceList}>
            <i className="fas fa-clipboard-list"></i> {t('button.invoice-list')}
          </Button>
        </Card.Body>
      </Card>
    </BlockUi>
  )
}

export { Invoice }

export default Invoice
