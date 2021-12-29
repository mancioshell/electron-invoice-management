import { Table } from 'react-bootstrap'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useState, useEffect, useContext } from 'react'

import SettingsContext from 'Contexts/SettingsContext'

function InvoiceResumeTable({ totalIncome = 0 }) {
  const { t } = useTranslation(['invoice-resume-table'])

  const { settings } = useContext(SettingsContext)

  const taxStampTreshold = settings['tax-stamp-treshold']
  const taxStampAmount = settings['tax-stamp-amount']

  const [iva, setIva] = useState(0)

  useEffect(() => {
    setIva((totalIncome || 0 * 4) / 100)
  }, [totalIncome])  

  const totalInvoice = parseFloat(
    totalIncome >= taxStampTreshold
      ? totalIncome || 0 + iva + taxStampAmount
      : totalIncome || 0 + iva
  ).toFixed(2)

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
          <td>{totalIncome} €</td>
        </tr>

        <tr>
          <td>
            <b>{t('iva')}</b>
          </td>
          <td>{iva} €</td>
        </tr>

        <tr>
          <td>
            <b>{t('total-income')}</b>
          </td>
          <td>{totalIncome + iva} €</td>
        </tr>

        {totalIncome > taxStampTreshold ? (
          <tr>
            <td>
              <b>{t('tax-stamp')}</b>
            </td>

            <td>{taxStampAmount} €</td>
          </tr>
        ) : null}

        <tr>
          <td>
            <b>{t('total-invoice')}</b>
          </td>
          <td>{totalInvoice} €</td>
        </tr>
      </tbody>
    </Table>
  )
}

export { InvoiceResumeTable }

export default InvoiceResumeTable
