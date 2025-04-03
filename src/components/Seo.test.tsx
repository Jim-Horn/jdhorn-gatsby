import React from 'react'
import { render } from '@testing-library/react'
import { Seo } from './Seo'

// Mock the useStaticQuery hook
jest.mock('gatsby', () => ({
  useStaticQuery: jest.fn(() => ({
    site: {
      siteMetadata: {
        title: 'Test Site',
        description: 'Test site description',
        author: '@testauthor',
      },
    },
  })),
  graphql: jest.fn(),
}))

describe('Seo', () => {
  // Save original environment
  const originalEnv = { ...process.env }
  
  // Mock document.head.querySelector to check meta tags
  const querySelectorSpy = jest.spyOn(document.head, 'querySelector')
  
  beforeEach(() => {
    // Reset document head before each test
    document.head.innerHTML = ''
    querySelectorSpy.mockClear()
  })
  
  afterAll(() => {
    // Restore original environment
    process.env = originalEnv
    querySelectorSpy.mockRestore()
  })
  
  it('renders title and meta tags correctly', () => {
    const title = 'Test Page'
    const description = 'Test page description'
    
    render(<Seo title={title} description={description} />)
    
    // Check title
    expect(document.title).toBe('Test Page | Test Site')
    
    // Check meta tags
    expect(getMetaContent('description')).toBe(description)
    expect(getMetaContent('og:title')).toBe(title)
    expect(getMetaContent('og:description')).toBe(description)
    expect(getMetaContent('og:type')).toBe('website')
    expect(getMetaContent('twitter:card')).toBe('summary')
    expect(getMetaContent('twitter:creator')).toBe('@testauthor')
    expect(getMetaContent('twitter:title')).toBe(title)
    expect(getMetaContent('twitter:description')).toBe(description)
  })
  
  it('uses site description when no description is provided', () => {
    const title = 'Test Page'
    
    render(<Seo title={title} description="" />)
    
    // Check that site description is used
    expect(getMetaContent('description')).toBe('Test site description')
    expect(getMetaContent('og:description')).toBe('Test site description')
    expect(getMetaContent('twitter:description')).toBe('Test site description')
  })
  
  it('renders children when provided', () => {
    const title = 'Test Page'
    const description = 'Test page description'
    const childTestId = 'seo-child'
    
    render(
      <Seo title={title} description={description}>
        <meta name="test" content="test-value" data-testid={childTestId} />
      </Seo>
    )
    
    // Check that child is rendered
    expect(getMetaContent('test')).toBe('test-value')
  })
})

// Helper function to get meta tag content
function getMetaContent(name: string): string | null {
  // Try to find by name
  let meta = document.querySelector(`meta[name="${name}"]`)
  
  // If not found, try to find by property (for Open Graph tags)
  if (!meta) {
    meta = document.querySelector(`meta[property="${name}"]`)
  }
  
  return meta ? meta.getAttribute('content') : null
}
