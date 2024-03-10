import * as React from 'react';
import { ImageHeader, Layout, Seo } from '../components';

const HeaderTest = () => (
  <Layout>
    <h1>Header test</h1>
    <ImageHeader />
  </Layout>
);

export const Head = () => (
  <Seo title="header test" description={''} children={undefined} />
);

export default HeaderTest;
