import React from 'react'

const initSettings = {
  brand: '',
  name: '',
  surname: '',
  address: '',
  city: '',
  cap: '',  
  cf: '',
  piva: '',
  "tax-stamp-treshold": 0,
  "tax-stamp-amount": 0
}

const value = {
  settings: initSettings,
  setSettings: () => {}
}

const SettingsContext = React.createContext(value)

export { SettingsContext, initSettings }

export default SettingsContext
