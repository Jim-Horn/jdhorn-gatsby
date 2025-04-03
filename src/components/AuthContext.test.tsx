import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { AuthProvider, useAuth } from './AuthContext'

// Mock environment variable
beforeAll(() => {
  process.env.GATSBY_ADMIN_PASSWORD = 'test-password'
})

const TestComponent = () => {
  const { isAuthenticated, login, logout } = useAuth()
  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? 'logged-in' : 'logged-out'}</div>
      <button onClick={() => login('test-password')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

describe('AuthContext', () => {
  it('provides authentication state and methods', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    // Initial state should be logged out
    expect(screen.getByTestId('auth-status')).toHaveTextContent('logged-out')

    // Login with correct password
    fireEvent.click(screen.getByText('Login'))
    expect(screen.getByTestId('auth-status')).toHaveTextContent('logged-in')

    // Logout
    fireEvent.click(screen.getByText('Logout'))
    expect(screen.getByTestId('auth-status')).toHaveTextContent('logged-out')
  })
})