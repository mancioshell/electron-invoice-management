import React from 'react'

import { render, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { configure } from '@testing-library/dom'

import Footer from './Footer'

configure({ asyncUtilTimeout: 50000 })

test('loads and displays footer', async () => {
  render(<Footer />)
  let anchor = screen.getByText('mancioshell')
  await waitFor(() => {
    expect(anchor).toHaveAttribute('href', 'https://github.com/mancioshell')
  })
})
