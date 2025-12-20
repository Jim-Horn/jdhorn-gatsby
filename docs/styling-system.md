# Styling System

## Overview

The styling system uses `styled-components` for component-level styling and CSS files for global styles. This provides a modern, maintainable approach to styling.

## Styled Components

### Integration

Configured in `gatsby-config.ts`:

```typescript
{
  resolve: `gatsby-plugin-styled-components`,
  options: {
    // Plugin options
  },
}
```

### Usage

Components define styled elements:

```typescript
import styled from 'styled-components';

const StyledContainer = styled.div`
  padding: 1rem;
  background-color: #fff;
`;
```

## Component Styling

### Web Toys

Both web toy components use styled-components:

**KaprekarCalculator** (`src/components/KaprekarCalculator/elements.tsx`):
- `StyledContainer`
- `StyledInputGroup`
- `StyledLabel`
- `StyledInput`
- `StyledButton`
- `StyledTextarea`

**PassWords** (`src/components/PassWords/elements.tsx`):
- `StyledPassword`
- `StyledContainer`
- `StyledRow`
- `StyledColumn`
- `StyledLabel`
- `StyledPossibilities`
- `StyledResults`
- `StyledOverlay`

### Post Templates

`src/templates/contentfulPost.tsx` uses styled-components:

```typescript
const Date = styled.span`
  font-size: small;
`;

const ContentSection = styled.section`
  margin-bottom: 1rem;
  .gatsby-image-wrapper {
    max-width: 100%;
    // ... responsive styles
  }
`;
```

## Global Styles

### Layout CSS

`src/components/Layout/layout.css` provides:
- Global resets
- Typography
- Layout utilities
- Responsive breakpoints

## Responsive Design

### Media Queries

Styled components use media queries:

```typescript
const ContentSection = styled.section`
  .gatsby-image-wrapper {
    max-width: 100%;
    @media (min-width: 480px) {
      max-width: 40%;
      float: left;
      margin: 0 1rem 1rem 0;
    }
  }
`;
```

### Grid System

PassWords component uses a responsive grid:

```typescript
const StyledColumn = styled.div<{ span: number; mobileSpan: number }>`
  // Base styles
  @media (max-width: 768px) {
    // Mobile styles
  }
`;
```

## CSS Classes

### Legacy Classes

Some components use CSS classes:
- `.quote` - Quote text styling
- `.quote-author` - Author text styling
- `.word` - Password word styling
- `.sep` - Password separator styling

## Image Styling

### Gatsby Image

Images use Gatsby Image plugin:
- Automatic optimization
- Blur placeholders
- Responsive sizing
- Constrained layout

### Styling

```typescript
.gatsby-image-wrapper {
  max-width: 100%;
  float: none;
  margin-bottom: 1rem;
  @media (min-width: 480px) {
    max-width: 40%;
    float: left;
  }
}
```

## Theme Support

### Potential Enhancement

Styled-components supports theming:

```typescript
const theme = {
  colors: {
    primary: '#663399',
    // ...
  },
};
```

Currently not implemented but structure supports it.

## CSS-in-JS Benefits

1. **Scoped Styles** - No style conflicts
2. **Dynamic Styles** - Props-based styling
3. **Type Safety** - TypeScript support
4. **Performance** - Automatic code splitting
5. **Maintainability** - Co-located styles

## Build Optimization

### Production

Styled-components automatically:
- Removes unused styles
- Minifies CSS
- Optimizes class names
- Code splits by route

## Testing

### Style Testing

Jest configuration mocks CSS:

```javascript
moduleNameMapper: {
  '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
}
```

## Best Practices

1. **Component Scoping** - Styles scoped to components
2. **Responsive First** - Mobile-first approach
3. **Reusability** - Shared styled components
4. **Performance** - Minimal re-renders
5. **Maintainability** - Clear naming conventions

## Future Enhancements

Potential improvements:
- Theme system
- Design tokens
- CSS variables
- Dark mode support
- Animation library

---

_Last updated: December 20, 2025_

