import * as React from 'react';
import { ExternalLink, Layout, Seo } from '../components';

const SiteMapPage = () => (
  <Layout>
    <section id="about">
      <h2>About</h2>
      <p>Hi there!</p>
      <p>
        I'm Jim Horn, a seasoned software developer based in Vancouver, BC.
        Since diving into web technologies in the late 1990s, I've navigated the
        evolution of the internet, crafting engaging web experiences since
        around 2000. My journey has been marked by a passion for learning and
        innovation, leading me to embrace a range of technologies and
        methodologies.
      </p>
      <p>
        This site is my digital playground — a place to experiment with the
        latest in web development, including GatsbyJS, Netlify, and Contentful.
        While it's definitely a work in progress, each line of code is a step
        towards mastering the balance between creativity, functionality,
        optimization, and accessibility. As this site evolves, so does my
        understanding of what makes the web tick. I love what I do, and
        therefore am doing what I love.
      </p>
      <p>
        Hosting this site comes at almost no cost, thanks to the generosity of{' '}
        <ExternalLink href="https://www.netlify.com/pricing/">
          Netlify's free tier
        </ExternalLink>
        ,{' '}
        <ExternalLink href="https://www.contentful.com/pricing/">
          Contentful's free content management capabilities
        </ExternalLink>
        , and{' '}
        <ExternalLink href="https://github.com/pricing">
          GitHub's robust version control
        </ExternalLink>
        — all underpinned by the minimal expense of domain registration. It's a
        testament to the power and accessibility of modern web development
        tools. I even code in{' '}
        <ExternalLink href="https://code.visualstudio.com/">
          VS Code
        </ExternalLink>{' '}
        — also free. It's a great time to be a web developer!
      </p>
      <p>
        As I continue to explore and expand my skill set, particularly diving
        deeper into TypeScript and AWS, this site will serve as a record of my
        journey and a showcase of what's possible. Whether you're here to learn,
        collaborate, or just explore, welcome to my corner of the internet.
      </p>
    </section>
  </Layout>
);

export const Head = () => (
  <Seo
    title="About"
    description="A bit about me and JDHorn.com"
    children={undefined}
  />
);

export default SiteMapPage;
