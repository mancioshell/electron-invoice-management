import { Form, Row, Col } from 'react-bootstrap'
import React, { useContext } from 'react'
import { Field } from 'formik'
import { useTranslation } from 'react-i18next'
import DatePicker from 'react-datepicker'

import SettingsContext from 'Contexts/SettingsContext'

function InvoiceInput({ totalIncome }) {
  const { t } = useTranslation(['invoice-form'])

  const { settings } = useContext(SettingsContext)

  const taxStampTreshold = settings['tax-stamp-treshold']

  return (
    <Row>
      <Col md="2">
        <Field name={`number`}>
          {({ field, form, meta }) => {
            return (
              <Form.Group controlId="number">
                <Form.Label>
                  <b>{t('invoice.number.label')} *</b> :
                </Form.Label>
                <Form.Control
                  type="number"
                  name={`invoice-number`}
                  min="1"
                  {...field}
                  data-testid={`invoice-number`}
                  isValid={form.submitCount > 0 && meta.touched && !meta.error}
                  isInvalid={form.submitCount > 0 && meta.touched && meta.error}
                  required
                  placeholder={t('invoice.number.placeholder')}
                />
                <Form.Control.Feedback type="invalid">
                  {t('invoice.number.feedback')}
                </Form.Control.Feedback>
              </Form.Group>
            )
          }}
        </Field>
      </Col>

      <Col md="4">
        <Field name={`date`}>
          {({ field, form, meta }) => {
            return (
              <Form.Group controlId="date">
                <Form.Label>
                  <b>{t('invoice.date.label')}</b> :
                </Form.Label>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  required
                  className={
                    form.submitCount > 0 && meta.touched
                      ? !meta.error
                        ? `form-control is-valid`
                        : `form-control is-invalid`
                      : `form-control`
                  }
                  data-testid="date"
                  selected={field.value}
                  onChange={(date) => form.setFieldValue('date', date)}
                  placeholderText={t('invoice.date.placeholder')}></DatePicker>

                {form.submitCount > 0 && meta.touched && meta.error ? (
                  <span className="manual-invalid-feedback">
                    {t('invoice.date.feedback')}
                  </span>
                ) : null}
              </Form.Group>
            )
          }}
        </Field>
      </Col>

      {totalIncome >= taxStampTreshold ? (
        <Col md="6">
          <Field name={`taxstamp`}>
            {({ field, form, meta }) => {
              return (
                <Form.Group controlId="taxstamp">
                  <Form.Label>
                    <b>{t('invoice.tax-stamp.label')} * </b> :
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name={`invoice-taxstamp`}
                    {...field}
                    data-testid={`invoice-taxstamp`}
                    isValid={
                      form.submitCount > 0 && meta.touched && !meta.error
                    }
                    isInvalid={
                      form.submitCount > 0 && meta.touched && meta.error
                    }
                    required
                    placeholder={t('invoice.tax-stamp.placeholder')}
                  />
                  <Form.Control.Feedback type="invalid">
                    {t('invoice.tax-stamp.feedback')}
                  </Form.Control.Feedback>
                </Form.Group>
              )
            }}
          </Field>
        </Col>
      ) : null}
    </Row>
  )
}

export default InvoiceInput
