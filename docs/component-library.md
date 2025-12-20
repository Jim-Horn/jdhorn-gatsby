# Component Library

## Overview

The component library contains reusable React components used throughout the site. Components are organized by functionality and located in `src/components/`.

## Core Components

### Layout

**Location**: `src/components/Layout/`

- `Layout.tsx` - Main layout wrapper
- `layout.css` - Layout styles

Provides:

- Consistent page structure
- Header/navigation
- Footer
- Content wrapper

### SEO

**Location**: `src/components/Seo.tsx`

Manages page metadata:

- Page titles
- Meta descriptions
- Open Graph tags
- Twitter card tags

**Usage:**

```tsx
<Seo title="Page Title" description="Page description" />
```

### Header

**Location**: `src/components/Header.tsx`

Site header component with navigation.

### ImageHeader

**Location**: `src/components/ImageHeader.tsx`

Header component with image support.

## Content Components

### Posts

**Location**: `src/components/Posts.tsx`

Displays list of blog posts with:

- Post titles
- Publication dates
- Links to post pages
- Tag display

### Tags

**Location**: `src/components/Tags.tsx`

Tag listing and navigation component.

### ListTags

**Location**: `src/components/ListTags.tsx`

Renders tag list for posts:

- Clickable tag links
- Styled tag display
- Responsive layout

## Embedded Content Components

### CodePen

**Location**: `src/components/CodePen.tsx`

Renders CodePen embeds:

- Pen ID support
- Height configuration
- Theme options
- Result panel toggle

**GraphQL Fragment:**

```graphql
fragment CodePen on ContentfulCodePen {
  penId
  height
  theme
  showResult
}
```

### ExternalLink

**Location**: `src/components/ExternalLink.tsx`

External link component:

- Opens in new tab
- Security attributes (rel="noopener noreferrer")
- Custom link text support

**GraphQL Fragment:**

```graphql
fragment ExternalLink on ContentfulExternalLink {
  url
  text
}
```

## Web Toy Components

### KaprekarCalculator

**Location**: `src/components/KaprekarCalculator/`

Interactive calculator for Kaprekar's constant.

See [Web Toys](./web-toys.md) for details.

### PassWords

**Location**: `src/components/PassWords/`

Password generator component.

See [Web Toys](./web-toys.md) for details.

## Utility Components

### GetQuote

**Location**: `src/components/GetQuote.tsx`

Displays random quote:

- Fetches quotes via GraphQL
- Random selection
- Quote and author display

### Sitemap

**Location**: `src/components/Sitemap.tsx`

Generates sitemap for the site.

## Component Exports

### Index File

`src/components/index.ts` provides centralized exports:

```typescript
export { Layout } from './Layout';
export { Seo } from './Seo';
export { GetQuote } from './GetQuote';
// ... other exports
```

**Usage:**

```typescript
import { Layout, Seo, GetQuote } from '../components';
```

## Component Structure

### Organization

```
src/components/
├── Layout/
│   ├── Layout.tsx
│   └── layout.css
├── KaprekarCalculator/
│   ├── KaprekarCalculator.tsx
│   ├── elements.tsx
│   ├── utils.ts
│   └── index.ts
├── PassWords/
│   ├── PassWords.tsx
│   ├── elements.tsx
│   ├── data.ts
│   ├── utils.ts
│   └── index.ts
├── CodePen.tsx
├── ExternalLink.tsx
├── GetQuote.tsx
├── Header.tsx
├── ImageHeader.tsx
├── ListTags.tsx
├── Posts.tsx
├── Seo.tsx
├── Sitemap.tsx
├── Tags.tsx
└── index.ts
```

## Styling

### Styled Components

Many components use `styled-components`:

- Component-specific styles
- Theme support
- Responsive design

### CSS Modules

Some components use CSS files:

- `layout.css` for Layout component
- Global styles in Layout

## Testing

### Test Files

Components have corresponding test files:

- `ExternalLink.test.tsx`
- `Header.test.tsx`
- `ListTags.test.tsx`
- `Seo.test.tsx`
- `KaprekarCalculator.test.tsx`

### Testing Library

Uses `@testing-library/react` for component tests.

## TypeScript

All components are written in TypeScript with:

- Type definitions
- Interface definitions
- Type safety

## Props Interfaces

Components define clear prop interfaces:

```typescript
interface SeoProps {
  description: string;
  title: string;
  children?: React.ReactNode;
}
```

## Best Practices

1. **Composition** - Components are composable
2. **Reusability** - Components are reusable across pages
3. **Type Safety** - TypeScript interfaces for all props
4. **Testing** - Test files for critical components
5. **Documentation** - Clear component purposes
6. **Exports** - Centralized exports via index files

---

_Last updated: December 20, 2025_
