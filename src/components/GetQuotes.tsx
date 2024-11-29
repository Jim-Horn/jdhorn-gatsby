import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Quote {
  id: string;
  author: string;
  quote: string;
}

export const GetQuotes: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get(
          'https://7qt946zi8d.execute-api.us-east-1.amazonaws.com/dev/quotes',
        );

        const transformedQuotes = response.data.map((item: any) => ({
          id: item.id.S,
          author: item.author.S,
          quote: item.quote.S,
        }));

        setQuotes(transformedQuotes);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch quotes.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {quotes.map(quote => (
        <li key={quote.id}>
          <strong>{quote.author}:</strong> {quote.quote}
        </li>
      ))}
    </ul>
  );
};
