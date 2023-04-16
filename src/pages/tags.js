import * as React from 'react';
import { Layout, Seo, Tags } from '../components';

const TagsPage = () => (
  <Layout>
    <h1>All tags</h1>
    <Tags />
  </Layout>
);

export const Head = () => <Seo title="All tags" />;

export default TagsPage;
