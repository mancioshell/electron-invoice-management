import React from 'react'

const value = {
  message: {
    text: '',
    type: '',
    variant: 'light',
    show: false
  },
  addMessage: () => {}
}

const UIContext = React.createContext(value)

export { UIContext }

export default UIContext
