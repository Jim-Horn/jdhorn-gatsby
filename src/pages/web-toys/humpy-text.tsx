import { Link } from 'gatsby';
import * as React from 'react';
import { ExternalLink, HumpyText, Layout, Seo } from '../../components';

const HumpyTextPage = () => (
  <Layout>
    <h1>Humpy text</h1>
    <p>
      Type anything below and see it transformed so letters alternate in case,
      like &quot;LiKe So&quot;. Non-letters stay as typed and do not flip the
      pattern.
    </p>
    <p>
      The original version lives on{' '}
      <ExternalLink href="https://codepen.io/JDHorn/pen/MWWoPJK?editors=0010">
        CodePen
      </ExternalLink>
      . For a write-up on the functional-programming style behind it, see{' '}
      <Link to="/posts/humpy-text/">this post</Link>. For related thoughts on
      building things with AI, see{' '}
      <Link to="/posts/coding-with-ai/">Coding with AI</Link>.
    </p>
    <HumpyText />
  </Layout>
);

export const Head = () => (
  <Seo
    title="Humpy text"
    description="Alternate upper and lowercase letters for playful text."
    children={undefined}
  />
);

export default HumpyTextPage;
