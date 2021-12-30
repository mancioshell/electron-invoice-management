import React from 'react'

import { render, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Footer from './Footer'

test('loads and displays footer', async () => {
  render(<Footer />)
  let anchor = screen.getByText('mancioshell')
  await waitFor(() => {
    expect(anchor).toHaveAttribute('href', 'https://github.com/mancioshell')
  })
})
