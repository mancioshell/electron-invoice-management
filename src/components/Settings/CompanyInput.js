import React from 'react'

import { Field } from 'formik'
import { Row, Col, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

function CompanyInput() {
  const { t } = useTranslation(['settings-form'])

  return (
    <section className="mt-5" id="settings">
      <h4>
        {' '}
        <i className="fas fa-dumbbell"></i> {t('company.label')}
      </h4>
      <hr />

      <Row>
        <Col>
          <Field name={`brand`}>
            {({ field, form, meta }) => {
              return (
                <Form.Group controlId="brand">
                  <Form.Label>
                    <b>{t('company.brand.label')} *</b> :
                  </Form.Label>
                  <Form.Control
                    type="text"
                    {...field}
                    data-testid="brand"
                    isValid={
                      form.submitCount > 0 && meta.touched && !meta.error
                    }
                    isInvalid={
                      form.submitCount > 0 && meta.touched && meta.error
                    }
                    required={true}
                    placeholder={t('company.brand.placeholder')}
                  />
                  <Form.Control.Feedback type="invalid">
                    {t('company.brand.feedback')}
                  </Form.Control.Feedback>
                </Form.Group>
              )
            }}
          </Field>
        </Col>

        <Col>
          <Field name={`name`}>
            {({ field, form, meta }) => {
              return (
                <Form.Group controlId="name">
                  <Form.Label>
                    <b>{t('company.name.label')} *</b> :
                  </Form.Label>
                  <Form.Control
                    type="text"
                    {...field}
                    data-testid="name"
                    isValid={
                      form.submitCount > 0 && meta.touched && !meta.error
                    }
                    isInvalid={
                      form.submitCount > 0 && meta.touched && meta.error
                    }
                    required
                    placeholder={t('company.name.placeholder')}
                  />
                  <Form.Control.Feedback type="invalid">
                    {t('company.name.feedback')}
                  </Form.Control.Feedback>
                </Form.Group>
              )
            }}
          </Field>
        </Col>

        <Col>
          <Field name={`surname`}>
            {({ field, form, meta }) => {
              return (
                <Form.Group controlId="surname">
                  <Form.Label>
                    <b>{t('company.surname.label')} *</b> :
                  </Form.Label>
                  <Form.Control
                    type="text"
                    {...field}
                    data-testid="surname"
                    isValid={
                      form.submitCount > 0 && meta.touched && !meta.error
                    }
                    isInvalid={
                      form.submitCount > 0 && meta.touched && meta.error
                    }
                    required
                    placeholder={t('company.surname.placeholder')}
                  />
                  <Form.Control.Feedback type="invalid">
                    {t('company.surname.feedback')}
                  </Form.Control.Feedback>
                </Form.Group>
              )
            }}
          </Field>
        </Col>

        <Col>
          <Field name={`address`}>
            {({ field, form, meta }) => {
              return (
                <Form.Group controlId="address">
                  <Form.Label>
                    <b>{t('company.address.label')} *</b> :
                  </Form.Label>
                  <Form.Control
                    type="text"
                    {...field}
                    data-testid="address"
                    isValid={
                      form.submitCount > 0 && meta.touched && !meta.error
                    }
                    isInvalid={
                      form.submitCount > 0 && meta.touched && meta.error
                    }
                    required
                    placeholder={t('company.address.placeholder')}
                  />
                  <Form.Control.Feedback type="invalid">
                    {t('company.address.feedback')}
                  </Form.Control.Feedback>
                </Form.Group>
              )
            }}
          </Field>
        </Col>
      </Row>

      <Row>
        <Col>
          <Field name={`cap`}>
            {({ field, form, meta }) => {
              return (
                <Form.Group controlId="cap">
                  <Form.Label>
                    <b>{t('company.cap.label')} *</b> :
                  </Form.Label>
                  <Form.Control
                    type="text"
                    {...field}
                    data-testid="cap"
                    isValid={
                      form.submitCount > 0 && meta.touched && !meta.error
                    }
                    isInvalid={
                      form.submitCount > 0 && meta.touched && meta.error
                    }
                    required
                    placeholder={t('company.cap.placeholder')}
                  />
                  <Form.Control.Feedback type="invalid">
                    {t('company.cap.feedback')}
                  </Form.Control.Feedback>
                </Form.Group>
              )
            }}
          </Field>
        </Col>

        <Col>
          <Field name={`city`}>
            {({ field, form, meta }) => (
              <Form.Group controlId="city">
                <Form.Label>
                  <b>{t('company.city.label')} *</b> :
                </Form.Label>
                <Form.Control
                  type="text"
                  {...field}
                  data-testid="city"
                  isValid={form.submitCount > 0 && meta.touched && !meta.error}
                  isInvalid={form.submitCount > 0 && meta.touched && meta.error}
                  required
                  placeholder={t('company.city.placeholder')}
                />
                <Form.Control.Feedback type="invalid">
                  {t('company.city.feedback')}
                </Form.Control.Feedback>
              </Form.Group>
            )}
          </Field>
        </Col>

        <Col>
          <Field name={`cf`}>
            {({ field, form, meta }) => (
              <Form.Group controlId="cf">
                <Form.Label>
                  <b>{t('company.cf.label')} *</b> :
                </Form.Label>
                <Form.Control
                  type="text"
                  {...field}
                  data-testid="cf"
                  isValid={form.submitCount > 0 && meta.touched && !meta.error}
                  isInvalid={form.submitCount > 0 && meta.touched && meta.error}
                  required
                  placeholder={t('company.cf.placeholder')}
                />
                <Form.Control.Feedback type="invalid">
                  {t('company.cf.feedback')}
                </Form.Control.Feedback>
              </Form.Group>
            )}
          </Field>
        </Col>

        <Col>
          <Field name={`piva`}>
            {({ field, form, meta }) => (
              <Form.Group controlId="piva">
                <Form.Label>
                  <b>{t('company.piva.label')} *</b> :
                </Form.Label>
                <Form.Control
                  type="text"
                  {...field}
                  data-testid="piva"
                  isValid={form.submitCount > 0 && meta.touched && !meta.error}
                  isInvalid={form.submitCount > 0 && meta.touched && meta.error}
                  required
                  placeholder={t('company.piva.placeholder')}
                />
                <Form.Control.Feedback type="invalid">
                  {t('company.piva.feedback')}
                </Form.Control.Feedback>
              </Form.Group>
            )}
          </Field>
        </Col>
      </Row>
    </section>
  )
}

export default CompanyInput
