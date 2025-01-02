import * as React from 'react';
import { ExternalLink, Layout, Seo } from '../../components';
import { KaprekarCalculator } from '../../components';

const KaprekarCalculatorPage = () => (
  <Layout>
    <h1>Kaprekar Calculator</h1>
    <p>
      The input must be a number between 1 and 9998, with at least two different
      digits; shorter numbers will be automatically padded with leading zeros to
      make them 4 digits. <a href="#more-info">More info</a>
    </p>
    <KaprekarCalculator />
    <h2 id="more-info">More Information</h2>
    <p>
      Kaprekar's constant, 6174, is a special number in mathematics discovered
      by the Indian mathematician D.R. Kaprekar. It is the result of an
      iterative process applied to most four-digit numbers: arrange the digits
      of the number in descending and ascending order to form the largest and
      smallest numbers, subtract the smaller from the larger, and repeat. After
      a few iterations (at most seven), the process converges to 6174,
      regardless of the starting number (provided the digits aren't all
      identical). This unique property makes 6174 a fascinating example of
      mathematical patterns and number theory.
    </p>
    <p>
      See this{' '}
      <ExternalLink href="https://en.wikipedia.org/wiki/6174">
        Wikipedia article
      </ExternalLink>{' '}
      for a more detailed explanation.
    </p>
  </Layout>
);

export const Head = () => (
  <Seo
    title="Kaprekar Calculator"
    description="This page showcases Kaprekar's Constant, a fascinating mathematical constant"
    children={undefined}
  />
);

export default KaprekarCalculatorPage;
