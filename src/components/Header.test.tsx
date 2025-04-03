import React from 'react'
import { render, screen } from '@testing-library/react'
import { Header } from './Header'

describe('Header', () => {
  it('renders site title', () => {
    const siteTitle = "Test Site"
    render(<Header siteTitle={siteTitle} />)
    expect(screen.getByText(siteTitle)).toBeInTheDocument()
  })

  it('renders link to home page', () => {
    render(<Header siteTitle="Test Site" />)
    const homeLink = screen.getByRole('link', { name: /test site/i })
    expect(homeLink).toHaveAttribute('href', '/')
  })
})