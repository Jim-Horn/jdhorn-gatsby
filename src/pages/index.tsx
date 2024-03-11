import * as React from 'react';
import { Link } from 'gatsby';
import { Seo, Posts, Layout } from '../components';

const HomePage = () => (
  <Layout>
    <p>You've arrived at jdhorn.com - a work in progress</p>
    <Posts />
    <p>
      If you're looking for other info, check out the{' '}
      <Link to="/sitemap">SiteMap</Link>
    </p>
  </Layout>
);

export const Head = () => (
  <Seo title="Home" description={''} children={undefined} />
);

export default HomePage;
