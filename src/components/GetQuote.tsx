import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Quote {
  id: string;
  author: string;
  quote: string;
}

export const GetQuote: React.FC = () => {
  const [fullQuote, setFullQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get<Quote>(
          'https://7qt946zi8d.execute-api.us-east-1.amazonaws.com/dev/quotes',
        );
        setFullQuote(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch quote.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const { author, quote } = fullQuote as Quote;

  return (
    quote && (
      <p className="quote">
        <strong>{author}:</strong> {quote}
      </p>
    )
  );
};
