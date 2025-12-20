# SEO & Analytics

## Overview

The site includes comprehensive SEO optimization and analytics tracking through Google Analytics and Google Tag Manager.

## SEO Component

### Location

`src/components/Seo.tsx`

### Implementation

```typescript
function Seo({ description, title, children }: SeoProps) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `);

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata?.author || ``} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  );
}
```

### Usage

```tsx
export const Head = () => (
  <Seo title="Page Title" description="Page description" />
);
```

### Features

- Dynamic page titles
- Meta descriptions
- Open Graph tags (Facebook, LinkedIn)
- Twitter Card tags
- Site metadata integration

## Google Analytics

### Configuration

In `gatsby-config.ts`:

```typescript
{
  resolve: `gatsby-plugin-google-analytics`,
  options: {
    trackingId: 'UA-5459816-1',
    head: true,
    anonymize: true,
    respectDNT: true,
    exclude: ['/preview/**', '/do-not-track/me/too/'],
    pageTransitionDelay: 0,
    defer: false,
    sampleRate: 5,
    siteSpeedSampleRate: 10,
    cookieDomain: 'jdhorn.com',
    enableWebVitalsTracking: true,
  },
}
```

### Features

- **Tracking ID**: UA-5459816-1
- **Head Placement**: Script in `<head>`
- **Anonymization**: IP addresses anonymized
- **DNT Respect**: Respects Do Not Track
- **Exclusions**: Excludes preview paths
- **Web Vitals**: Tracks Core Web Vitals
- **Sampling**: 5% pageview sampling, 10% speed sampling

## Google Tag Manager

### Configuration

In `gatsby-config.ts`:

```typescript
{
  resolve: 'gatsby-plugin-google-tagmanager',
  options: {
    id: 'UA-5459816-1',
    includeInDevelopment: false,
    defaultDataLayer: { platform: 'gatsby' },
  },
}
```

### Features

- **GTM ID**: UA-5459816-1
- **Development**: Disabled in development
- **Data Layer**: Default platform data

## Site Metadata

### Configuration

In `gatsby-config.ts`:

```typescript
siteMetadata: {
  title: `jdhorn.com`,
  description: `Jim Horn's website`,
  author: `@jdhorn`,
  siteUrl: `https://jdhorn.com/`,
}
```

### Usage

Accessed via GraphQL:

```graphql
query {
  site {
    siteMetadata {
      title
      description
      author
    }
  }
}
```

## Page-Specific SEO

### Post Pages

Posts have `seoTitle` field from Contentful:
- Used in SEO component
- Falls back to regular title
- Optimized for search engines

### Tag Pages

Tag pages use tag name in title:
- Format: `{Tag Name} | jdhorn.com`
- Includes tag description

## Sitemap

### Component

`src/components/Sitemap.tsx` - Generates sitemap

### Page

`src/pages/sitemap.tsx` - Sitemap page

### Purpose

- Lists all pages
- Helps search engine indexing
- XML sitemap generation (potential)

## Open Graph

### Tags

- `og:title` - Page title
- `og:description` - Page description
- `og:type` - Content type (website)
- `og:url` - Page URL (potential)

### Usage

Enables rich previews when sharing links on:
- Facebook
- LinkedIn
- Slack
- Other social platforms

## Twitter Cards

### Tags

- `twitter:card` - Card type (summary)
- `twitter:creator` - Author handle
- `twitter:title` - Page title
- `twitter:description` - Page description

### Usage

Enables rich previews when sharing on Twitter.

## Web Vitals

### Tracking

Enabled via Google Analytics:
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

### Purpose

Monitor site performance and user experience.

## Privacy

### Features

- **Anonymization**: IP addresses anonymized
- **DNT Respect**: Respects Do Not Track header
- **Cookie Domain**: Restricted to jdhorn.com
- **Sampling**: Reduced data collection

## Best Practices

1. **Unique Titles** - Each page has unique title
2. **Descriptions** - All pages have meta descriptions
3. **Social Tags** - Open Graph and Twitter tags
4. **Performance** - Web Vitals tracking
5. **Privacy** - DNT and anonymization

## Future Enhancements

Potential improvements:
- Structured data (JSON-LD)
- Image optimization for social sharing
- Sitemap.xml generation
- Robots.txt configuration
- Analytics dashboard integration

---

_Last updated: December 20, 2025_

