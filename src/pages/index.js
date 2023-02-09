import * as React from 'react';
// import { Link } from 'gatsby';
// import { StaticImage } from 'gatsby-plugin-image';

import Layout from '../components/layout';
import Seo from '../components/seo';

const HomePage = () => (
  <Layout>
    <h1>Hi</h1>
  </Layout>
);

export const Head = () => <Seo title="Home" />;

export default HomePage;
