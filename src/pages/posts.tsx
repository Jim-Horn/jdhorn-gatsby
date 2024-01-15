import * as React from 'react';
import { Layout, Seo, Posts } from '../components';

const PostsPage = () => (
  <Layout>
    <h1>All posts</h1>
    <Posts heading={null} showTags showDate />
  </Layout>
);

export const Head = () => (
  <Seo title="All posts" description={''} children={undefined} />
);

export default PostsPage;
