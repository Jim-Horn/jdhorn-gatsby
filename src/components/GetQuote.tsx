import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

interface Quote {
  author: string;
  quote: string;
}

interface QuoteQueryResult {
  allQuote: {
    nodes: Quote[];
  };
}

export const GetQuote: React.FC = () => {
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

  // Get all quotes from the query
  const quotes = data.allQuote.nodes;

  // Pick a random quote
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // If no quotes are available, return a fallback UI
  if (!randomQuote) {
    return <p>No quotes available</p>;
  }

  return (
    <div>
      <div className="quote">“{randomQuote.quote}”</div>
      <div className="quote-author">- {randomQuote.author}</div>
    </div>
  );
};
