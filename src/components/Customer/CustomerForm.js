import { Form, Button } from 'react-bootstrap'
import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import BlockUi from 'react-block-ui'
import { useTranslation } from 'react-i18next'

import CustomerInput from 'components/Customer/CustomerInput'

const customerSchema = yup
  .object()
  .shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    address: yup.string().required(),
    cap: yup
      .string()
      .matches(/^[0-9]{5}$/, { excludeEmptyString: true })
      .required(),
    city: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().email().required(),
    cf: yup
      .string()
      .matches(
        /^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$/,
        { excludeEmptyString: true }
      )
      .required(),
    piva: yup.string().matches(/^[0-9]{11}$/, { excludeEmptyString: true })
  })
  .required()

const schema = yup.object().shape({
  customer: customerSchema
})

function CustomerForm({ customer, saveCustomer }) {
  const resetForm = (actions) => () => {
    actions.resetForm()
    actions.setSubmitting(false)
  }

  const { t } = useTranslation(['customer-form'])

  return (
    <Formik
      initialValues={{ customer }}
      enableReinitialize={true}
      validationSchema={schema}
      onSubmit={(values, actions) => {
        saveCustomer(values.customer, resetForm(actions))
      }}>
      {(formik) => (
        <BlockUi blocking={formik.isSubmitting}>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <CustomerInput></CustomerInput>

            <hr className="mt-2"></hr>

            <Button className="mr-3" variant="primary" type="submit">
              <i className="fas fa-save"></i> {t('button.save')}
            </Button>
          </Form>
        </BlockUi>
      )}
    </Formik>
  )
}

export { CustomerInput, CustomerForm, customerSchema }

export default CustomerForm
