import React from 'react'
import { render, screen } from '@testing-library/react'
import { ListTags } from './ListTags'

// Mock the Gatsby Link component
jest.mock('gatsby', () => ({
  Link: jest.fn().mockImplementation(
    // these props are invalid for an `a` tag
    ({
      to,
      children,
      ...rest
    }) => {
      return (
        <a href={to} {...rest}>
          {children}
        </a>
      )
    }
  ),
}))

describe('ListTags', () => {
  it('renders a list of tags with links', () => {
    const tags = 'React,JavaScript,TypeScript'
    
    render(<ListTags tags={tags} />)
    
    // Check that all tags are rendered
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    
    // Check that links have correct hrefs
    expect(screen.getByText('React').closest('a')).toHaveAttribute('href', '/tag/react')
    expect(screen.getByText('JavaScript').closest('a')).toHaveAttribute('href', '/tag/javascript')
    expect(screen.getByText('TypeScript').closest('a')).toHaveAttribute('href', '/tag/typescript')
  })

  it('handles tags with whitespace', () => {
    const tags = ' React , JavaScript , TypeScript '
    
    render(<ListTags tags={tags} />)
    
    // Check that all tags are rendered without extra whitespace
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('sorts tags alphabetically', () => {
    const tags = 'JavaScript,React,TypeScript'
    
    render(<ListTags tags={tags} />)
    
    // Get all tag elements
    const tagElements = screen.getAllByRole('listitem')
    
    // Check that tags are sorted alphabetically
    expect(tagElements[0].textContent).toBe('JavaScript')
    expect(tagElements[1].textContent).toBe('React')
    expect(tagElements[2].textContent).toBe('TypeScript')
  })
})
