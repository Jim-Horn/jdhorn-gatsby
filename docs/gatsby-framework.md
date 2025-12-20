# Gatsby Framework & Build System

## Overview

The site is built on Gatsby 5, a React-based static site generator. This system handles the core build process, plugin management, and development workflow.

## Key Files

- `gatsby-config.ts` - Main configuration file
- `gatsby-node.ts` - Node APIs for page creation and data sourcing
- `gatsby-browser.ts` - Browser APIs for client-side functionality
- `gatsby-ssr.ts` - Server-side rendering configuration

## Configuration

### Site Metadata

Located in `gatsby-config.ts`:

```typescript
siteMetadata: {
  title: `jdhorn.com`,
  description: `Jim Horn's website`,
  author: `@jdhorn`,
  siteUrl: `https://jdhorn.com/`,
}
```

## Plugins

### Core Plugins

1. **gatsby-plugin-netlify** - Netlify deployment integration
2. **gatsby-plugin-image** - Optimized image handling
3. **gatsby-plugin-sharp** - Image processing
4. **gatsby-transformer-sharp** - Image transformation
5. **gatsby-plugin-styled-components** - Styled-components support
6. **gatsby-plugin-manifest** - PWA manifest generation

### Content Plugins

- **gatsby-source-filesystem** - File system source
- **gatsby-source-contentful** - Contentful CMS integration

### Analytics Plugins

- **gatsby-plugin-google-analytics** - Google Analytics tracking
- **gatsby-plugin-google-tagmanager** - Google Tag Manager integration

## Build Process

### Development

```bash
yarn develop
# or
yarn dev
```

Starts development server at `http://localhost:8000` with hot-reloading.

### Production Build

```bash
yarn build
```

Generates optimized static files in the `public/` directory.

### Serve Production Build

```bash
yarn serve
```

Serves the production build locally for testing.

## Node APIs

### createPages

Programmatically creates pages for:
- Contentful posts (`/posts/{slug}`)
- Tag pages (`/tag/{tag}`)

See [Dynamic Page Generation](./page-generation.md) for details.

### sourceNodes

Fetches quotes from external API and creates Gatsby nodes:
- Fetches from: `https://7qt946zi8d.execute-api.us-east-1.amazonaws.com/dev/quotes`
- Creates nodes of type `Quote`

## Browser APIs

### onClientEntry

Removes React DevTools in production builds for security.

## SSR APIs

### onRenderBody

Sets HTML language attribute to `en`.

## Environment Variables

Required environment variables:
- `CONTENTFUL_ACCESS_TOKEN` - Contentful API access token

## Scripts

Available npm/yarn scripts:
- `develop` - Start development server
- `build` - Build for production
- `serve` - Serve production build
- `clean` - Clean cache and public directory
- `test` - Run tests
- `format` - Format code with Prettier

---

_Last updated: December 20, 2025_

