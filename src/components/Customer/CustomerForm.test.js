import React from 'react'

import { waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CustomerForm from './CustomerForm'
import userEvent from '@testing-library/user-event'

import i18NextCustomRender from 'Root/i18next/i18n.test'
import config from 'Public/locales/it/customer-form.json'

let customer = {
  name: '',
  surname: '',
  address: '',
  cap: '',
  city: '',
  phone: '',
  email: '',
  cf: '',
  piva: ''
}

let newCustomer = {
  name: 'John',
  surname: 'Doe',
  address: 'Trafalgar Square',
  cap: '22331',
  city: 'London',
  phone: '+44 7911 123456',
  email: 'john.doe@gmail.com',
  cf: 'JHNDOE72E04H501T',
  piva: ''
}

let saveCustomer

const customRender = (ui, renderOptions) =>
  i18NextCustomRender(ui, { ...config }, renderOptions)

beforeEach(() => {
  saveCustomer = jest.fn()
})

afterEach(() => {
  saveCustomer.mockRestore()
})

test('rendering and submitting a CustomerForm', async () => {
  customRender(<CustomerForm customer={customer} saveCustomer={saveCustomer} />)

  userEvent.type(screen.getByLabelText(/Nome/), newCustomer.name)
  userEvent.type(screen.getByLabelText(/Cognome/), newCustomer.surname)
  userEvent.type(screen.getByLabelText(/Indirizzo \*/), newCustomer.address)
  userEvent.type(screen.getByLabelText(/Cap \*/), newCustomer.cap)
  userEvent.type(screen.getByLabelText(/Città \*/), newCustomer.city)
  userEvent.type(
    screen.getByLabelText(/Recapito Telefonico \*/),
    newCustomer.phone
  )
  userEvent.type(screen.getByLabelText(/Email/), newCustomer.email)
  userEvent.type(screen.getByLabelText(/Codice Fiscale/), newCustomer.cf)

  userEvent.click(screen.getByRole('button', { name: /Salva/ }))

  await waitFor(() => {
    expect(saveCustomer).toHaveBeenCalledWith(newCustomer, expect.anything())
  })
})

test('display an error on submitting', async () => {
  customRender(<CustomerForm customer={customer} saveCustomer={saveCustomer} />)

  userEvent.type(screen.getByLabelText(/Nome/), newCustomer.name)
  userEvent.type(screen.getByLabelText(/Cognome/), newCustomer.surname)
  userEvent.type(screen.getByLabelText(/Indirizzo \*/), newCustomer.address)
  userEvent.type(screen.getByLabelText(/Cap \*/), newCustomer.cap)
  userEvent.type(screen.getByLabelText(/Città \*/), newCustomer.city)
  userEvent.type(
    screen.getByLabelText(/Recapito Telefonico \*/),
    newCustomer.phone
  )

  userEvent.click(screen.getByRole('button', { name: /Salva/ }))

  await waitFor(() => {
    expect(saveCustomer).not.toHaveBeenCalled()
    expect(screen.getByTestId('name')).toHaveClass('is-valid')
    expect(screen.getByTestId('surname')).toHaveClass('is-valid')
    expect(screen.getByTestId('address')).toHaveClass('is-valid')
    expect(screen.getByTestId('cap')).toHaveClass('is-valid')
    expect(screen.getByTestId('city')).toHaveClass('is-valid')
    expect(screen.getByTestId('phone')).toHaveClass('is-valid')
    expect(screen.getByTestId('email')).toHaveClass('is-valid')
    
    expect(screen.getByTestId('cf')).toHaveClass('is-invalid')
  })
})
