import * as React from 'react';
import { ExternalLink, Layout, Seo } from '../../components';
import { WordPasswords } from '../../components/pass-words';

const PassWordsPage = () => (
  <Layout>
    <h1>Pass🔒Words</h1>
    <p>
      Generate passwords that are secure, yet easy to remember using
      three-letter words.
    </p>
    <WordPasswords />
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
