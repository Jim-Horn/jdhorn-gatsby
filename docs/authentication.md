# Authentication System - REMOVED

## Status

**This system has been removed from the codebase as of December 20, 2025.**

## Overview

The authentication system provided password-based authentication for admin areas of the site. It used React Context to manage authentication state across the application.

**Note:** This authentication system was built to support the admin system, which was also a skeleton with no functionality. Since the admin system was removed, the authentication system was also removed.

## Implementation

### AuthContext Component

Located in `src/components/AuthContext.tsx`

### Context Structure

```typescript
interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => void;
  logout: () => void;
}
```

### Provider Component

```typescript
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (password: string) => {
    if (password === process.env.GATSBY_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

## Integration

### Root Element Wrapping

In `gatsby-browser.ts`:

```typescript
export const wrapRootElement = ({ element }: { element: React.ReactNode }) =>
  React.createElement(AuthProvider, null, element);
```

This makes authentication available to all pages.

## Usage

### Hook

```typescript
import { useAuth } from '../components/AuthContext';

const { isAuthenticated, login, logout } = useAuth();
```

### Authentication Check

```typescript
if (!isAuthenticated) {
  // Show login form or redirect
}
```

## Password Storage

### Environment Variable

- **Variable**: `GATSBY_ADMIN_PASSWORD`
- **Prefix**: `GATSBY_` makes it available in browser
- **Security**: Password is compared client-side (not ideal for production)

### Configuration

Set in:
- Local: `.env` file
- Netlify: Environment variables in dashboard

## Admin Routes

### Protected Routes

Admin routes are defined in `src/utils/adminRoutes.ts`:

```typescript
export const adminRoutes = [
  { name: 'Add Quote', path: '/admin/add-quote' },
  { name: 'Manage Quotes', path: '/admin/manage-quotes' },
];
```

### Route Protection

Currently, admin pages should check authentication:

```typescript
const AdminPage = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <LoginForm />;
  }
  
  return <AdminContent />;
};
```

## Security Considerations

### Current Implementation

- **Client-side only** - Password check happens in browser
- **No server validation** - Anyone can view source to see password
- **Session state** - Lost on page refresh

### Recommendations

For production, consider:
- Server-side authentication
- JWT tokens
- Secure session management
- HTTPS only
- Rate limiting
- Password hashing

## Testing

Test file: `src/components/AuthContext.test.tsx`

Tests cover:
- Context provider functionality
- Login/logout behavior
- Error handling

## Future Enhancements

**Note:** Since the admin system is incomplete, consider whether this authentication system is needed at all. If removing the admin skeleton, this authentication system could also be removed.

If keeping/implementing admin features, potential improvements:
- Server-side authentication
- Token-based auth
- Persistent sessions
- Role-based access control
- Multi-user support
- Password reset functionality

---

_Last updated: December 20, 2025_

