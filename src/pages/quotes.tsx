import * as React from 'react';
import { Layout, Seo, GetQuotes } from '../components';

const QuotesPage = () => (
  <Layout>
    <h1>Quotes</h1>
    <GetQuotes />
  </Layout>
);

export const Head = () => (
  <Seo title="List quotes" description={''} children={undefined} />
);

export default QuotesPage;
