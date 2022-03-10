import React, { useEffect } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'

import { Field, FieldArray } from 'formik'

import { useTranslation } from 'react-i18next'

const InvoiceServiceInput = ({ index, remove, items }) => {
  const { t } = useTranslation(['invoice-service-list-input'])

  return (
    <Row className="mb-3">
      <Col sm="6" md="6" lg="6">
        <Field name={`services.${index}.type`}>
          {({ field, form, meta }) => {
            const isValid = form.submitCount > 0 && meta.touched && !meta.error
            const isInvalid = form.submitCount > 0 && meta.touched && meta.error

            return (
              <Form.Group controlId={`service.${index}.type`}>
                <Form.Label>
                  <b>{t('service.label')} *</b> :
                </Form.Label>
                <Form.Control
                  type="text"
                  name={`services.${index}.type`}
                  {...field}
                  data-testid={`services.${index}.type`}
                  isValid={isValid}
                  isInvalid={isInvalid}
                  required
                  placeholder={t('service.placeholder')}
                />
                <Form.Control.Feedback type="invalid">
                  {t('service.feedback')}
                </Form.Control.Feedback>
              </Form.Group>
            )
          }}
        </Field>
      </Col>
      <Col sm="4" md="4" lg="4">
        <Field name={`services.${index}.price`}>
          {({ field, form, meta }) => {
            return (
              <Form.Group controlId={`service.${index}.price`}>
                <Form.Label>
                  <b>{t('amount.label')} *</b> :
                </Form.Label>
                <Form.Control
                  type="number"
                  name={`services.${index}.price`}
                  min="1"
                  {...field}
                  data-testid={`services.${index}.price`}
                  isValid={form.submitCount > 0 && meta.touched && !meta.error}
                  isInvalid={form.submitCount > 0 && meta.touched && meta.error}
                  required
                  placeholder={t('amount.placeholder')}
                />
                <Form.Control.Feedback type="invalid">
                  {t('amount.feedback')}
                </Form.Control.Feedback>
              </Form.Group>
            )
          }}
        </Field>
      </Col>

      {items.length > 1 ? (
        <Col sm="2" md="2" lg="2" className="align-self-center">
          <Button
            variant="danger"
            className="mt-3"
            type="button"
            size="sm"
            onClick={(e) => remove(index)}>
            <i className="fas fa-trash"></i> {t('button.remove')}
          </Button>
        </Col>
      ) : null}
    </Row>
  )
}

function InvoiceServiceListInput({ formik, onTotalServicesChange }) {
  const { t } = useTranslation(['invoice-form'])

  useEffect(() => {  
    onTotalServicesChange(formik.values.services)
  }, [onTotalServicesChange, formik.values.services])

  return (
    <FieldArray
      name="services"
      render={(arrayHelpers) => {
        return (
          <>
            <Row>
              <Col>
                <h4 className="mt-3">
                  <i className="fas fa-dumbbell"></i> {t('service-list.label')}
                </h4>
                <hr className="mt-2"></hr>
              </Col>
            </Row>
            {formik.values.services.map((item, index) => (
              <InvoiceServiceInput
                key={index}
                index={index}
                remove={arrayHelpers.remove}
                items={formik.values.services}
              />
            ))}

            <Row>
              <Col>
                <span className="btn-group float-right">
                  <Button
                    variant="dark"
                    type="button"
                    size="sm"
                    onClick={() => arrayHelpers.push({ type: '', price: 1 })}>
                    <i className="fas fa-plus"></i> {t('service-list.button')}
                  </Button>
                </span>
              </Col>
            </Row>
          </>
        )
      }}
    />
  )
}

export default InvoiceServiceListInput
