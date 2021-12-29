import React, { useState, useEffect } from 'react'
import { SettingsContext, initSettings } from 'Contexts/SettingsContext'

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(initSettings)

  useEffect(() => {
    const getSettings = async () => {
      let settings = await window?.api?.getSettings()
      setSettings(settings)
    }

    getSettings()
  }, [])

  const { Provider } = SettingsContext
  return <Provider value={{settings, setSettings}}>{children}</Provider>
}

export default SettingsProvider
