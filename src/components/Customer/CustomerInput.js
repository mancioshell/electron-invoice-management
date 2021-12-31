import { Form, Row, Col } from 'react-bootstrap'
import React from 'react'
import { Field } from 'formik'
import { useTranslation } from 'react-i18next'

function CustomerInput() {
  const { t } = useTranslation(['customer-form'])

  return (
    <section className="mt-5" id="customer">
      <Row>
        <Field name={`customer.name`}>
          {({ field, form, meta }) => {
            return (
              <Form.Group as={Col} controlId="name">
                <Form.Label>
                  <b>{t('name.label')} *</b> :
                </Form.Label>
                <Form.Control
                  type="text"
                  {...field}
                  data-testid="name"
                  isValid={form.submitCount > 0 && meta.touched && !meta.error}
                  isInvalid={form.submitCount > 0 && meta.touched && meta.error}
                  required
                  placeholder={t('name.placeholder')}
                />
                <Form.Control.Feedback type="invalid">
                  {t('name.feedback')}
                </Form.Control.Feedback>
              </Form.Group>
            )
          }}
        </Field>

        <Field name={`customer.surname`}>
          {({ field, form, meta }) => (
            <Form.Group as={Col} controlId="surname">
              <Form.Label>
                <b>{t('surname.label')} *</b> :
              </Form.Label>
              <Form.Control
                type="text"
                {...field}
                data-testid="surname"
                isValid={form.submitCount > 0 && meta.touched && !meta.error}
                isInvalid={form.submitCount > 0 && meta.touched && meta.error}
                required
                placeholder={t('surname.placeholder')}
              />
              <Form.Control.Feedback type="invalid">
                {t('surname.feedback')}
              </Form.Control.Feedback>
            </Form.Group>
          )}
        </Field>
      </Row>

      <Row>
        <Field name={`customer.address`}>
          {({ field, form, meta }) => (
            <Form.Group as={Col} controlId="address">
              <Form.Label>
                <b>{t('address.label')} *</b> :
              </Form.Label>
              <Form.Control
                type="text"
                {...field}
                data-testid="address"
                isValid={form.submitCount > 0 && meta.touched && !meta.error}
                isInvalid={form.submitCount > 0 && meta.touched && meta.error}
                required
                placeholder={t('address.placeholder')}
              />
              <Form.Control.Feedback type="invalid">
                {t('address.feedback')}
              </Form.Control.Feedback>
            </Form.Group>
          )}
        </Field>

        <Field name={`customer.cap`}>
          {({ field, form, meta }) => (
            <Form.Group as={Col} controlId="cap">
              <Form.Label>
                <b>{t('cap.label')} *</b> :
              </Form.Label>
              <Form.Control
                type="text"
                {...field}
                data-testid="cap"
                isValid={form.submitCount > 0 && meta.touched && !meta.error}
                isInvalid={form.submitCount > 0 && meta.touched && meta.error}
                required
                placeholder={t('cap.placeholder')}
              />
              {meta.touched}
              <Form.Control.Feedback type="invalid">
                {t('cap.feedback')}
              </Form.Control.Feedback>
            </Form.Group>
          )}
        </Field>

        <Field name={`customer.city`}>
          {({ field, form, meta }) => (
            <Form.Group as={Col} controlId="city">
              <Form.Label>
                <b>{t('city.label')} *</b> :
              </Form.Label>
              <Form.Control
                type="text"
                {...field}
                data-testid="city"
                isValid={form.submitCount > 0 && meta.touched && !meta.error}
                isInvalid={form.submitCount > 0 && meta.touched && meta.error}
                required
                placeholder={t('city.placeholder')}
              />
              <Form.Control.Feedback type="invalid">
                {t('city.feedback')}
              </Form.Control.Feedback>
            </Form.Group>
          )}
        </Field>
      </Row>

      <Row>
        <Field name={`customer.phone`}>
          {({ field, form, meta }) => {
            return (
              <Form.Group as={Col} controlId="phone">
                <Form.Label>
                  <b>{t('phone.label')} *</b> :
                </Form.Label>
                <Form.Control
                  type="text"
                  {...field}
                  data-testid="phone"
                  isValid={form.submitCount > 0 && meta.touched && !meta.error}
                  isInvalid={form.submitCount > 0 && meta.touched && meta.error}
                  required
                  placeholder={t('phone.placeholder')}
                />
                <Form.Control.Feedback type="invalid">
                  {t('phone.feedback')}
                </Form.Control.Feedback>
              </Form.Group>
            )
          }}
        </Field>

        <Field name={`customer.email`}>
          {({ field, form, meta }) => {
            return (
              <Form.Group as={Col} controlId="email">
                <Form.Label>
                  <b>{t('email.label')}</b> :
                </Form.Label>
                <Form.Control
                  type="text"
                  {...field}
                  data-testid="email"
                  isValid={form.submitCount > 0 && meta.touched && !meta.error}
                  isInvalid={form.submitCount > 0 && meta.touched && meta.error}
                  required
                  placeholder={t('email.placeholder')}
                />
                <Form.Control.Feedback type="invalid">
                  {t('email.feedback')}
                </Form.Control.Feedback>
              </Form.Group>
            )
          }}
        </Field>
      </Row>

      <Row>
        <Field name={`customer.cf`}>
          {({ field, form, meta }) => {
            return (
              <Form.Group as={Col} controlId="cf">
                <Form.Label>
                  <b>{t('cf.label')} *</b> :
                </Form.Label>
                <Form.Control
                  type="text"
                  {...field}
                  data-testid="cf"
                  isValid={form.submitCount > 0 && meta.touched && !meta.error}
                  isInvalid={form.submitCount > 0 && meta.touched && meta.error}
                  required
                  placeholder={t('cf.placeholder')}
                />
                <Form.Control.Feedback type="invalid">
                  {t('cf.feedback')}
                </Form.Control.Feedback>
              </Form.Group>
            )
          }}
        </Field>

        <Field name={`customer.piva`}>
          {({ field, form, meta }) => {
            return (
              <Form.Group as={Col} controlId="piva">
                <Form.Label>
                  <b>{t('piva.label')}</b> :
                </Form.Label>
                <Form.Control
                  type="text"
                  {...field}
                  data-testid="piva"
                  required
                  placeholder={t('piva.placeholder')}
                />
              </Form.Group>
            )
          }}
        </Field>
      </Row>
    </section>
  )
}

export default CustomerInput
