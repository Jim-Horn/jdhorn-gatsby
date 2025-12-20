# Contentful CMS Integration

## Overview

The site uses Contentful as a headless CMS to manage blog posts and content. Content is fetched at build time and made available through Gatsby's GraphQL data layer.

## Configuration

Configured in `gatsby-config.ts`:

```typescript
{
  resolve: `gatsby-source-contentful`,
  options: {
    spaceId: `5fb4xoh9wju8`,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  },
}
```

## Content Types

The integration supports several Contentful content types:

1. **ContentfulPost** - Main blog post content
2. **ContentfulPostTags** - Tag taxonomy
3. **ContentfulCodeBlock** - Code snippets with syntax highlighting
4. **ContentfulCodePen** - Embedded CodePen demos
5. **ContentfulExternalLink** - External link references
6. **ContentfulAsset** - Images and media files

## GraphQL Queries

### Fetching Posts

Posts are queried in `gatsby-node.ts` during build:

```graphql
query {
  allContentfulPost {
    nodes {
      slug
    }
  }
}
```

### Post Template Query

Individual posts are queried in `src/templates/contentfulPost.tsx`:

```graphql
query ($slug: String!) {
  contentfulPost(slug: { eq: $slug }) {
    title
    slug
    dateDiff: date(fromNow: true)
    date(formatString: "dddd, MMMM DD, YYYY")
    seoTitle
    postTags {
      tag
      friendlyName
    }
    content {
      raw
      references {
        ... on ContentfulCodePen {
          ...CodePen
        }
        ... on ContentfulExternalLink {
          ...ExternalLink
        }
        ... on ContentfulAsset {
          gatsbyImageData
          description
          title
        }
        ... on ContentfulCodeBlock {
          language
          showLineNumbers
          code {
            code
          }
        }
        ... on ContentfulPost {
          slug
          title
        }
      }
    }
  }
}
```

## Rich Text Rendering

Contentful rich text is rendered using `gatsby-source-contentful/rich-text`:

```typescript
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { options } from '../utils/options';

renderRichText(content, options);
```

The `options` utility (`src/utils/options.tsx`) defines custom renderers for:

- CodePen embeds
- External links
- Code blocks
- Images
- Internal post links

## Content Models

Content models are defined in the `content-models/` directory:

- `post.js` - Post content model structure
- `postTags.js` - Tag model structure
- `codeBlock.js` - Code block model
- `codePen.js` - CodePen embed model
- `externalLink.js` - External link model

## Image Handling

Contentful images are processed through Gatsby Image:

- Optimized loading with blur placeholders
- Responsive image generation
- Constrained layout (max width: 800px)

## Build-Time Data Fetching

All Contentful content is fetched at build time, not runtime. This means:

- Fast page loads (static HTML)
- No API calls during user visits
- Content updates require rebuilds

## Environment Setup

Requires `CONTENTFUL_ACCESS_TOKEN` environment variable set in:

- Local development: `.env` file
- Netlify: Environment variables in dashboard

---

_Last updated: December 20, 2025_
