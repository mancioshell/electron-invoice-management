import { Table } from 'react-bootstrap'
import React from 'react'
import { useTranslation } from 'react-i18next'

function InvoiceResumeTable({ invoiceEntry }) {
  const { t } = useTranslation(['invoice-resume-table'])

  return (
    <Table striped hover size="sm">
      <thead>
        <tr>
          <th>Voce</th>
          <th>Importo</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <b>{t('taxable-income')}</b>
          </td>
          <td>{parseFloat(invoiceEntry.totalIncome).toFixed(2)} €</td>
        </tr>

        <tr>
          <td>
            <b>{t('inps')}</b>
          </td>
          <td>{parseFloat(invoiceEntry.totalIva).toFixed(2)} €</td>
        </tr>

        <tr>
          <td>
            <b>{t('total-income')}</b>
          </td>
          <td>
            {parseFloat(
              invoiceEntry.totalIncome + invoiceEntry.totalIva
            ).toFixed(2)}{' '}
            €
          </td>
        </tr>

        {invoiceEntry.taxStamp > 0 ? (
          <tr>
            <td>
              <b>{t('tax-stamp')}</b>
            </td>

            <td>{invoiceEntry.taxStamp} €</td>
          </tr>
        ) : null}

        <tr>
          <td>
            <b>{t('total-invoice')}</b>
          </td>
          <td>{invoiceEntry.totalInvoice} €</td>
        </tr>
      </tbody>
    </Table>
  )
}

export { InvoiceResumeTable }

export default InvoiceResumeTable
