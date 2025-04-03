import React from 'react'
import { render, screen } from '@testing-library/react'
import { ExternalLink } from './ExternalLink'

describe('ExternalLink', () => {
  it('renders with href and children', () => {
    const url = 'https://example.com'
    const linkText = 'Example Link'
    
    render(<ExternalLink href={url}>{linkText}</ExternalLink>)
    
    const link = screen.getByText(linkText)
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', url)
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('uses href as link text when no children are provided', () => {
    const url = 'https://example.com'
    
    render(<ExternalLink href={url} />)
    
    const link = screen.getByText(url)
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', url)
  })
})
