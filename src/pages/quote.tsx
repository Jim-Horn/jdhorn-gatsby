import * as React from 'react';
import { Layout, Seo, GetQuote } from '../components';

const QuotesPage = () => (
  <Layout>
    <h1>Quote</h1>
    <GetQuote />
  </Layout>
);

export const Head = () => (
  <Seo title="List quotes" description={''} children={undefined} />
);

export default QuotesPage;
