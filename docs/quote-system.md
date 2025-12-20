# Quote System

## Overview

The quote system fetches quotes from an external API, makes them available through Gatsby's GraphQL layer, and displays random quotes on the site.

## API Integration

### Source

Quotes are fetched from:

```
https://7qt946zi8d.execute-api.us-east-1.amazonaws.com/dev/quotes
```

### Data Structure

```typescript
{
  id: string;
  author: string;
  quote: string;
}
[];
```

## Node Creation

### Implementation

In `gatsby-node.ts`, the `sourceNodes` function:

```typescript
export const sourceNodes: GatsbyNode['sourceNodes'] = async ({
  actions,
  createContentDigest,
}) => {
  const { createNode } = actions;

  const response = await axios.get<Quote[]>(QUOTES_API_URL);
  const quotes = response.data;

  quotes.forEach((quote, index) => {
    createNode({
      id: quote.id || `quote-${index}`,
      author: quote.author,
      quote: quote.quote,
      internal: {
        type: 'Quote',
        contentDigest: createContentDigest(quote),
      },
    });
  });
};
```

### Node Type

- **Type**: `Quote`
- **Fields**: `id`, `author`, `quote`
- **Content Digest**: Used for cache invalidation

## GraphQL Query

### Component Query

`src/components/GetQuote.tsx` queries all quotes:

```graphql
query {
  allQuote {
    nodes {
      author
      quote
    }
  }
}
```

### Usage

```typescript
const data = useStaticQuery<QuoteQueryResult>(graphql`
  query {
    allQuote {
      nodes {
        author
        quote
      }
    }
  }
`);
```

## Quote Display

### Component

`src/components/GetQuote.tsx`:

- Fetches all quotes via GraphQL
- Selects a random quote
- Displays quote and author
- Handles empty state

### Random Selection

```typescript
const randomIndex = Math.floor(Math.random() * quotes.length);
const randomQuote = quotes[randomIndex];
```

### Rendering

```tsx
<div>
  <div className="quote">"{randomQuote.quote}"</div>
  <div className="quote-author">- {randomQuote.author}</div>
</div>
```

## Quote Page

### Location

`src/pages/quote.tsx` - Dedicated quotes page

### Implementation

```tsx
const QuotesPage = () => (
  <Layout>
    <h1>Quote</h1>
    <GetQuote />
  </Layout>
);
```

## Build-Time Fetching

Quotes are fetched **at build time**, not runtime:

- Fast page loads (no API calls during visits)
- Quotes are static until next build
- Requires rebuild to update quotes

## Error Handling

```typescript
try {
  const response = await axios.get<Quote[]>(QUOTES_API_URL);
  // ... create nodes
} catch (error) {
  console.error('Error fetching quotes:', error);
}
```

Build continues even if quote fetch fails (graceful degradation).

## Caching

Gatsby uses content digests to cache nodes:

- Same quote data = same digest = no rebuild
- Changed quote data = new digest = rebuild required

## Future Enhancements

Potential improvements:

- Quote categories/tags
- Search functionality
- Favorite quotes
- Share functionality
- Real-time updates (webhooks)

---

_Last updated: December 20, 2025_
