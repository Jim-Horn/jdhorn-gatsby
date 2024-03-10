import * as React from 'react';
import { Layout, Seo, Tags } from '../components';
import ImageHeader from '../components/imageHeader';

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
