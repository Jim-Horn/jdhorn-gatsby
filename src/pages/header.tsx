import * as React from 'react';
import { Layout, Seo, Header } from '../components';

const HeaderTest = () => (
  <Layout>
    <h1>Header test</h1>
    <Header siteTitle="foo" />
  </Layout>
);

export const Head = () => (
  <Seo title="header test" description={''} children={undefined} />
);

export default HeaderTest;
