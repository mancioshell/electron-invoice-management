import './InvoiceForm.css'

import { Form, Row, Col, Button } from 'react-bootstrap'
import React, { useState, useContext } from 'react'

import { Formik, validateYupSchema, yupToFormErrors } from 'formik'

import * as yup from 'yup'

import { useTranslation } from 'react-i18next'
import BlockUi from 'Components/Utils/BlockUI'

import InvoiceInput from 'Components/Invoice/InvoiceInput'
import InvoiceServiceListInput from 'Components/Invoice/InvoiceServiceListInput'

import { CustomerInput, customerSchema } from 'Components/Customer/CustomerForm'
import InvoiceResumeTable from 'Components/Invoice/InvoiceResumeTable'

import SettingsContext from 'Contexts/SettingsContext'

import useInvoiceEntry from 'Hooks/useInvoiceEntry'

const InvoiceSchema = yup.object({
  customer: customerSchema,
  date: yup.date().required(),
  payment: yup.string().oneOf(["MP01","MP05", "MP08"]).required(),
  number: yup.number().required(),
  taxstamp: yup.string().when('$data', (data, schema) => {
    return data?.totalIncome >= data?.taxStampTreshold
      ? schema.matches(/^[0-9]{14}$/, { excludeEmptyString: true }).required()
      : schema
  }),
  services: yup
    .array()
    .of(
      yup
        .object({
          type: yup.string().required(),
          price: yup.number().min(1).required()
        })
        .required()
    )
    .required()
})

function InvoiceForm({ invoice, saveInvoice, searchCustomerInput, onChangeDate }) {
  const { t } = useTranslation(['invoice-form'])

  const { settings } = useContext(SettingsContext)

  const taxStampTreshold = settings['tax-stamp-treshold']
  const taxStampAmount = settings['tax-stamp-amount']

  const [services, setServices] = useState([])

  const invoiceEntry = useInvoiceEntry(
    services,
    taxStampTreshold,
    taxStampAmount
  )

  const resetForm = (actions) => (invoice) => {
    if (invoice) actions.resetForm({ values: invoice })
    actions.setSubmitting(false)
  }

  return (
    <Formik
      initialValues={invoice}
      enableReinitialize={true}
      validate={(values) => {
        try {
          validateYupSchema(values, InvoiceSchema, true, {
            data: { totalIncome: invoiceEntry.totalIncome, taxStampTreshold }
          })
          return {}
        } catch (err) {
          return yupToFormErrors(err)
        }
      }}
      onSubmit={(values, actions) => {
        saveInvoice(values, resetForm(actions))
      }}>
      {(formik) => (
        <BlockUi blocking={formik.isSubmitting}>
          <Form noValidate onSubmit={formik.handleSubmit}>
            {searchCustomerInput(formik)}

            <CustomerInput></CustomerInput>

            <section className="mt-5 mb-4" id="invoice-service-form">
              <InvoiceServiceListInput
                formik={formik}
                onTotalServicesChange={
                  setServices
                }></InvoiceServiceListInput>
            </section>

            <section id="invoice-form-input">
              <h3>
                <i className="fas fa-file-invoice"></i> {t('title')}
              </h3>
              <hr className="mt-2"></hr>

              <InvoiceInput
                totalIncome={invoiceEntry.totalIncome} onChangeDate={onChangeDate}></InvoiceInput>
            </section>

            <section id="invoice-resume-table">
              <Row className="mt-5">
                <Col md={{ span: 6, offset: 6 }}>
                  <InvoiceResumeTable
                    invoiceEntry={invoiceEntry}></InvoiceResumeTable>
                </Col>
              </Row>
            </section>

            <hr className="mt-5"></hr>

            <Button className="mr-3" variant="primary" type="submit">
              <i className="fas fa-save"></i> {t('button.save')}
            </Button>
          </Form>
        </BlockUi>
      )}
    </Formik>
  )
}

export default InvoiceForm
