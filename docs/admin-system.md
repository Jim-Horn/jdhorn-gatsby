# Admin System

## Overview

The admin system provides a dashboard and management interfaces for site administrators. Currently includes quote management with potential for expansion.

## Structure

### Admin Pages

Located in `src/pages/admin/`:

- `index.tsx` - Admin dashboard home
- `manage-quotes.tsx` - Quote management interface

### Route Configuration

Defined in `src/utils/adminRoutes.ts`:

```typescript
export const adminRoutes = [
  { name: 'Add Quote', path: '/admin/add-quote' },
  { name: 'Manage Quotes', path: '/admin/manage-quotes' },
];
```

## Admin Dashboard

### Location

`src/pages/admin/index.tsx`

### Implementation

```typescript
const AdminHomePage: React.FC = () => {
  return (
    <Layout>
      <h1>Admin Dashboard</h1>
      <ul>
        {adminRoutes.map((route: { path: string; name: string }) => (
          <li key={route.path}>
            <Link to={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
```

### Features

- Lists all available admin routes
- Navigation links to admin sections
- Uses Layout component for consistency

## Quote Management

### Location

`src/pages/admin/manage-quotes.tsx`

### Current Status

Currently a placeholder page:

```typescript
const AdminManageQuotes: React.FC = () => {
  return (
    <Layout>
      <h1>Manage Quotes</h1>
      <p>Lorem ipsum...</p>
    </Layout>
  );
};
```

### Planned Features

Future implementation should include:
- List all quotes
- Add new quotes
- Edit existing quotes
- Delete quotes
- API integration for CRUD operations

## Authentication Integration

### Protection

Admin pages should check authentication:

```typescript
import { useAuth } from '../components/AuthContext';

const AdminPage = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <LoginForm />;
  }
  
  return <AdminContent />;
};
```

### Access Control

- Password-protected via `GATSBY_ADMIN_PASSWORD`
- Client-side authentication check
- See [Authentication System](./authentication.md) for details

## Admin Routes Utility

### Purpose

Centralized route configuration for:
- Navigation generation
- Route validation
- Future route protection

### Usage

```typescript
import { adminRoutes } from '../utils/adminRoutes';

adminRoutes.map(route => (
  <Link to={route.path}>{route.name}</Link>
))
```

## Layout Consistency

All admin pages use the `Layout` component:
- Consistent header/navigation
- Shared styling
- SEO integration

## Future Enhancements

### Potential Admin Features

1. **Content Management**
   - Post editor
   - Tag management
   - Media library

2. **Analytics**
   - View statistics
   - Traffic reports
   - Popular content

3. **Settings**
   - Site configuration
   - Theme settings
   - Feature toggles

4. **User Management**
   - Multi-user support
   - Role management
   - Activity logs

## API Integration

### Quote API

Quotes are fetched from:
```
https://7qt946zi8d.execute-api.us-east-1.amazonaws.com/dev/quotes
```

Future admin interface should support:
- POST - Create new quote
- PUT - Update existing quote
- DELETE - Remove quote

## Security Considerations

- Admin routes should be protected
- API calls should include authentication
- Sensitive operations should require confirmation
- Audit logging for admin actions

---

_Last updated: December 20, 2025_

