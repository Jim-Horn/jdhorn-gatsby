# Content Models

## Overview

Content models define the structure of content types in Contentful CMS. These models are documented in the `content-models/` directory and define the schema for blog posts, tags, and embedded content.

## Content Types

### Post (`content-models/post.js`)

The main blog post content type.

**Fields:**
- `title` - Post title
- `slug` - URL-friendly identifier
- `date` - Publication date
- `content` - Rich text content (can include embedded content)
- `seoTitle` - SEO-optimized title
- `tags` - String field for legacy tag support
- `postTags` - Reference to PostTags entries

**Usage:**
- Rendered in `src/templates/contentfulPost.tsx`
- Pages created at `/posts/{slug}`

### PostTags (`content-models/postTags.js`)

Tag taxonomy system for categorizing posts.

**Fields:**
- `tag` - URL-friendly tag identifier
- `friendlyName` - Human-readable tag name

**Usage:**
- Tag pages generated at `/tag/{tag}`
- Used for post categorization and filtering

### CodeBlock (`content-models/codeBlock.js`)

Code snippets with syntax highlighting support.

**Fields:**
- `language` - Programming language (e.g., "javascript", "python")
- `showLineNumbers` - Boolean for line number display
- `code` - Code content object

**Rendering:**
- Handled by `src/utils/options.tsx` renderer
- Uses `react-syntax-highlighter` for syntax highlighting

### CodePen (`content-models/codePen.js`)

Embedded CodePen demos.

**Fields:**
- `penId` - CodePen pen ID
- `height` - Embed height
- `theme` - CodePen theme
- `showResult` - Whether to show result panel

**Rendering:**
- Rendered by `src/components/CodePen.tsx`
- Uses `react-codepen-embed` package

### ExternalLink (`content-models/externalLink.js`)

External link references within rich text.

**Fields:**
- `url` - External URL
- `text` - Link text (optional, falls back to URL)

**Rendering:**
- Handled by `src/components/ExternalLink.tsx`
- Opens in new tab with security attributes

## Rich Text Embedding

All embedded content types (CodeBlock, CodePen, ExternalLink, Asset, Post) are embedded within the Post `content` field as rich text references.

The rendering system in `src/utils/options.tsx` handles:
- Detecting embedded content types
- Rendering appropriate React components
- Passing necessary props to components

## GraphQL Fragments

Components define GraphQL fragments for their data needs:

- `CodePen` fragment in `src/components/CodePen.tsx`
- `ExternalLink` fragment in `src/components/ExternalLink.tsx`

These fragments are used in the post template query to fetch embedded content.

## Content Relationships

```
Post
├── postTags (many-to-many via PostTags)
└── content (rich text)
    ├── CodePen (embedded)
    ├── CodeBlock (embedded)
    ├── ExternalLink (embedded)
    ├── Asset (embedded images)
    └── Post (internal links)
```

## Tag Consolidation

The `consolidatePostTags` utility (`src/utils/consolidatePostTags.ts`) merges:
- Legacy `tags` string field
- Modern `postTags` reference field

This ensures backward compatibility and unified tag display.

---

_Last updated: December 20, 2025_

