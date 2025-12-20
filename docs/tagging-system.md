# Tagging System

## Overview

The tagging system provides categorization and navigation for blog posts. It supports both legacy string-based tags and modern reference-based tags.

## Tag Storage

### Modern System (PostTags)

Tags are stored as separate Contentful entries:

- **Content Type**: `ContentfulPostTags`
- **Fields**:
  - `tag` - URL-friendly identifier (e.g., "javascript")
  - `friendlyName` - Display name (e.g., "JavaScript")

### Legacy System

Older posts may have tags stored as a comma-separated string in the `tags` field.

## Tag Consolidation

The `consolidatePostTags` utility (`src/utils/consolidatePostTags.ts`) merges both systems:

```typescript
export function consolidatePostTags(
  postTags?: Array<{ tag: string; friendlyName: string }>,
  tags?: string,
): Array<{ tag: string; friendlyName: string }>;
```

**Process:**

1. Extracts tags from `postTags` references
2. Parses comma-separated `tags` string
3. Merges and deduplicates
4. Returns unified array

## Tag Pages

### Generation

Tag pages are generated in `gatsby-node.ts`:

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

Located in `src/templates/tag.tsx`:

- Displays tag name
- Lists all posts with that tag
- Uses regex filtering for legacy tag support

### URL Structure

- Pattern: `/tag/{tag}`
- Example: `/tag/javascript`

## Tag Display

### Component

`src/components/ListTags.tsx` renders tag lists:

```typescript
<ListTags tags={consolidatePostTags(postTags, tags)} />
```

### Rendering

Tags are displayed as:

- Clickable links to tag pages
- Styled with CSS classes
- Responsive layout

## Tag Navigation

### Main Tags Page

`src/pages/tags.tsx` displays all available tags:

- Lists all tags from Contentful
- Links to individual tag pages
- Sorted alphabetically

### Post Integration

Tags appear on:

- Individual post pages (bottom of content)
- Tag pages (list of related posts)
- Posts listing page (filtering)

## GraphQL Queries

### Fetch All Tags

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

### Filter Posts by Tag

In tag template:

```graphql
query ($tagRegex: String!) {
  allContentfulPost(
    filter: {
      tags: { regex: $tagRegex }
      postTags: { elemMatch: { tag: { eq: $tag } } }
    }
  ) {
    nodes {
      # post fields
    }
  }
}
```

## Tag Management

Tags are managed in Contentful CMS:

- Create new tags as `PostTags` entries
- Assign tags to posts via reference field
- Legacy tags in string field are automatically parsed

## Future Improvements

Potential enhancements:

- Tag counts (number of posts per tag)
- Tag hierarchy/categories
- Tag search/filtering
- Popular tags display

---

_Last updated: December 20, 2025_
