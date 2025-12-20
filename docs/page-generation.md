# Dynamic Page Generation

## Overview

Gatsby's `createPages` API in `gatsby-node.ts` programmatically generates pages at build time for blog posts and tag pages.

## Implementation

Located in `gatsby-node.ts`, the `createPages` function:

1. Queries all Contentful posts
2. Queries all tags
3. Creates pages for each post
4. Creates pages for each tag

## Post Pages

### Query

```graphql
query {
  allContentfulPost {
    nodes {
      slug
    }
  }
}
```

### Page Creation

```typescript
contentfulPosts.data?.allContentfulPost.nodes.forEach(node => {
  createPage({
    path: '/posts' + node.slug,
    component: contentfulPageTemplate,
    context: { slug: node.slug },
  });
});
```

### Template

- **Component**: `src/templates/contentfulPost.tsx`
- **Path Pattern**: `/posts/{slug}`
- **Context**: `{ slug: string }`

The template uses the slug to query the full post data via GraphQL.

## Tag Pages

### Query

```graphql
query {
  allContentfulPostTags(sort: { tag: ASC }) {
    nodes {
      tag
      friendlyName
    }
  }
}
```

### Page Creation

```typescript
allTags?.data?.allContentfulPostTags.nodes.forEach(node => {
  createPage({
    path: '/tag/' + node.tag,
    component: tagPageTemplate,
    context: {
      tag: node,
      tagRegex: `/${node.tag}/i`,
    },
  });
});
```

### Template

- **Component**: `src/templates/tag.tsx`
- **Path Pattern**: `/tag/{tag}`
- **Context**: 
  - `tag`: Tag object with `tag` and `friendlyName`
  - `tagRegex`: Regex pattern for filtering posts

## Build Process

1. **Source Nodes** - Contentful data is fetched and added to GraphQL layer
2. **Create Pages** - `createPages` runs and generates all pages
3. **Build** - React components are rendered to static HTML

## Error Handling

If GraphQL queries fail:

```typescript
if (contentfulPosts.errors || allTags.errors) {
  reporter.panicOnBuild(
    'Error loading Contentful result',
    contentfulPosts.errors,
  );
  return;
}
```

This stops the build process if content cannot be loaded.

## Template Components

### contentfulPost.tsx

Renders individual blog posts with:
- Post title and date
- Rich text content with embedded components
- Tag list
- SEO metadata

### tag.tsx

Renders tag pages with:
- Tag name
- List of posts with that tag
- Filtering logic

## Static vs Dynamic

All pages are **statically generated** at build time:
- No server-side rendering at request time
- Fast page loads
- Content updates require rebuilds

## GraphQL Context

The `context` object passed to `createPage` is available in template GraphQL queries:

```graphql
query ($slug: String!) {
  contentfulPost(slug: { eq: $slug }) {
    # ...
  }
}
```

The `$slug` variable comes from the page context.

---

_Last updated: December 20, 2025_

