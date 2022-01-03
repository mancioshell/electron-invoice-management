import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'

import BlockUi from 'Components/Utils/BlockUI'
import { useTranslation } from 'react-i18next'

import CompanyInput from 'Components/Settings/CompanyInput'
import SettingsInput from 'Components/Settings/SettingsInput'

const schema = yup
  .object()
  .shape({
    brand: yup.string().required(),
    name: yup.string().required(),
    surname: yup.string().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    cap: yup
      .string()
      .matches(/^[0-9]{5}$/)
      .required(),
    cf: yup
      .string()
      .matches(
        /^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$/
      )
      .required(),
    piva: yup
      .string()
      .matches(/^[0-9]{11}$/)
      .required(),
    'tax-stamp-treshold': yup.number().required(),
    'tax-stamp-amount': yup.number().required()
  })
  .required()

function SettingsForm({ settings, saveSettings }) {
  const { t } = useTranslation(['settings-form'])

  const resetForm = (actions) => (settings) => {
    actions.resetForm({ values: settings })
    actions.setSubmitting(false)
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ ...settings }}
      validationSchema={schema}     
      onSubmit={(values, actions) => {
        saveSettings(values, resetForm(actions))
      }}>
      {(formik) => (
        <BlockUi tag="div" blocking={formik.isSubmitting}>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <CompanyInput></CompanyInput>
            <SettingsInput></SettingsInput>

            <hr className="mt-2"></hr>

            <Button className="mr-3" variant="primary" type="submit">
              <i className="fas fa-save"></i> {t('button')}
            </Button>
          </Form>
        </BlockUi>
      )}
    </Formik>
  )
}

export { SettingsForm }

export default SettingsForm
