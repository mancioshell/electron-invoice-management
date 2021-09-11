import React from 'react'
import { Field } from 'formik'

import { Row, Col, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

function SettingsInput() {
  const { t } = useTranslation(['settings-form'])

  return (
    <section className="mt-5" id="settings">
      <h4>
        {' '}
        <i className="fas fa-stamp"></i> {t('tax-stamp.label')}
      </h4>
      <hr />

      <Row>
        <Col>
          <Field name={`tax-stamp-treshold`}>
            {({ field, form, meta }) => (
              <Form.Group controlId="tax-stamp-treshold">
                <Form.Label>
                  <b>{t('tax-stamp.tax-stamp-treshold.label')} *</b> :
                </Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  {...field}
                  data-testid="tax-stamp-treshold"
                  isValid={form.submitCount > 0 && meta.touched && !meta.error}
                  isInvalid={form.submitCount > 0 && meta.touched && meta.error}
                  required
                  placeholder={t('tax-stamp.tax-stamp-treshold.placeholder')}
                />
                <Form.Control.Feedback type="invalid">
                  {t('tax-stamp.tax-stamp-treshold.feedback')}
                </Form.Control.Feedback>
              </Form.Group>
            )}
          </Field>
        </Col>

        <Col>
          <Field name={`tax-stamp-amount`}>
            {({ field, form, meta }) => (
              <Form.Group controlId="tax-stamp-amount">
                <Form.Label>
                  <b>{t('tax-stamp.tax-stamp-amount.label')} *</b> :
                </Form.Label>
                <Form.Control
                  type="number"
                  step="0.5"
                  {...field}
                  data-testid="tax-stamp-amount"
                  isValid={form.submitCount > 0 && meta.touched && !meta.error}
                  isInvalid={form.submitCount > 0 && meta.touched && meta.error}
                  required
                  placeholder={t('tax-stamp.tax-stamp-amount.placeholder')}
                />
                <Form.Control.Feedback type="invalid">
                  {t('tax-stamp.tax-stamp-amount.feedback')}
                </Form.Control.Feedback>
              </Form.Group>
            )}
          </Field>
        </Col>
      </Row>
    </section>
  )
}

export default SettingsInput
