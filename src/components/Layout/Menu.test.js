import React from 'react'

import { waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { configure } from '@testing-library/dom'

import Menu from './Menu'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import SettingsContext from 'Contexts/SettingsContext'

import i18NextCustomRender from 'Root/i18next/i18n.test'
import config from 'Public/locales/it/menu.json'

configure({ asyncUtilTimeout: 5000 })

let settings = {
  brand: 'Invoice Assistant'
}

const customRender = (ui, { providerProps, ...renderOptions }) => {
  const Provider = (
    <SettingsContext.Provider {...providerProps}>{ui}</SettingsContext.Provider>
  )

  return i18NextCustomRender(Provider, { ...config }, renderOptions)
}

beforeEach(() => {
  window.api = {
    getSettings: jest.fn().mockImplementation(async () => settings)
  }
})

afterEach(() => {
  //windowSpy.mockRestore();
})

test('loads and displays menu brand', async () => {
  const history = createMemoryHistory()
  const providerProps = {
    value: { settings }
  }

  customRender(
    <Router history={history}>
      <Menu />
    </Router>,
    { providerProps }
  )

  await waitFor(() => {
    expect(screen.getByText(new RegExp(`^${settings.brand}`, 'i')))
  })
})
