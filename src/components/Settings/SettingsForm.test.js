import React from 'react'

import { waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SettingsForm from 'Components/Settings/SettingsForm'
import userEvent from '@testing-library/user-event'

import i18NextCustomRender from 'Root/i18n.test'
import config from 'Public/locales/it/settings-form.json'

let settings = {
  brand: '',
  name: '',
  surname: '',
  address: '',
  city: '',
  cap: '',
  cf: '',
  piva: '',
  'tax-stamp-treshold': 0,
  'tax-stamp-amount': 0
}

let newSettings = {
  brand: 'Invoice Assistant',
  name: 'Amedeo',
  surname: 'Boccali',
  address: "Via Isabella d'Este 40",
  city: 'Roma',
  cap: '00164',
  cf: 'BCCMDA85E19H501X',
  piva: '16224641007',
  'tax-stamp-treshold': 77.47,
  'tax-stamp-amount': 2
}

let saveSettings

const customRender = (ui, renderOptions) =>
  i18NextCustomRender(ui, { ...config }, renderOptions)

beforeEach(() => {
  saveSettings = jest.fn()
})

afterEach(() => {
  saveSettings.mockRestore()
})

test('rendering and submitting a SettingsForm', async () => {
  customRender(<SettingsForm settings={settings} saveSettings={saveSettings} />)

  userEvent.type(screen.getByLabelText(/Nome Applicazione/), newSettings.brand)
  userEvent.type(screen.getByLabelText(/Nome \*/), newSettings.name)
  userEvent.type(screen.getByLabelText(/Cognome/), newSettings.surname)
  userEvent.type(screen.getByLabelText(/Indirizzo/), newSettings.address)
  userEvent.type(screen.getByLabelText(/Cap/), newSettings.cap)
  userEvent.type(screen.getByLabelText(/Città/), newSettings.city)
  userEvent.type(screen.getByLabelText(/Codice Fiscale/), newSettings.cf)
  userEvent.type(screen.getByLabelText(/Partita IVA/), newSettings.piva)

  userEvent.type(
    screen.getByLabelText(/Soglia Marca da Bollo \(€\)/),
    newSettings['tax-stamp-treshold'].toString()
  )
  userEvent.type(
    screen.getByLabelText(/Costo Marca da Bollo \(€\)/),
    newSettings['tax-stamp-amount'].toString()
  )

  userEvent.click(screen.getByRole('button', { name: /Salva/ })) 

  await waitFor(() => {
    expect(saveSettings).toHaveBeenCalledWith(newSettings, expect.anything())
  })
})

test('display an error on submitting', async () => {
  
  customRender(<SettingsForm settings={settings} saveSettings={saveSettings} />)
  
  userEvent.type(screen.getByLabelText(/Nome Applicazione/), newSettings.brand)
  userEvent.type(screen.getByLabelText(/Nome \*/), newSettings.name)
  userEvent.type(screen.getByLabelText(/Cognome/), newSettings.surname)
  userEvent.type(screen.getByLabelText(/Indirizzo/), newSettings.address)
  userEvent.type(screen.getByLabelText(/Cap/), newSettings.cap)
  userEvent.type(screen.getByLabelText(/Città/), newSettings.city)
  userEvent.type(screen.getByLabelText(/Codice Fiscale/), newSettings.cf)

  userEvent.type(
    screen.getByLabelText(/Soglia Marca da Bollo \(€\)/),
    newSettings['tax-stamp-treshold'].toString()
  )
  userEvent.type(
    screen.getByLabelText(/Costo Marca da Bollo \(€\)/),
    newSettings['tax-stamp-amount'].toString()
  )

  userEvent.click(screen.getByRole('button', { name: /Salva/ }))  

  await waitFor(() => {    

    expect(screen.getByLabelText(/Partita IVA/)).toHaveClass(
      'is-invalid'
    )

    expect(saveSettings).not.toHaveBeenCalled()
    
    expect(screen.getByLabelText(/Nome Applicazione/)).toHaveClass('is-valid')
    expect(screen.getByLabelText(/Nome \*/)).toHaveClass('is-valid')
    expect(screen.getByLabelText(/Cognome/)).toHaveClass('is-valid')
    expect(screen.getByLabelText(/Indirizzo/)).toHaveClass('is-valid')
    expect(screen.getByLabelText(/Cap/)).toHaveClass('is-valid')
    expect(screen.getByLabelText(/Città/)).toHaveClass('is-valid')
    expect(screen.getByLabelText(/Codice Fiscale/)).toHaveClass('is-valid')

    expect(screen.getByLabelText(/Soglia Marca da Bollo \(€\)/)).toHaveClass('is-valid')
    expect(screen.getByLabelText(/Costo Marca da Bollo \(€\)/)).toHaveClass('is-valid')    

  })
})
