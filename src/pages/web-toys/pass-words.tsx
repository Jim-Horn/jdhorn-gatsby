import * as React from 'react';
import { ExternalLink, Layout, Seo } from '../../components';
import { PassWords } from '../../components/';

const PassWordsPage = () => (
  <Layout>
    <h1>Pass🔒Words</h1>
    <p>
      Generate passwords that are secure, yet easy to remember using
      three-letter words.
    </p>
    <PassWords />
  </Layout>
);

export const Head = () => (
  <Seo
    title="Pass🔒Words"
    description="Generate passwords that are secure, yet easy to remember using three-letter words."
    children={undefined}
  />
);

export default PassWordsPage;
