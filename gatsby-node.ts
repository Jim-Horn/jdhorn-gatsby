import { GatsbyNode } from 'gatsby';
import path from 'path';
import axios from 'axios';

const tagPageTemplate = path.resolve(`./src/templates/tag.tsx`);
const contentfulPageTemplate = path.resolve(
  `./src/templates/contentfulPost.tsx`,
);

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;

  type ContentfulQueryResult = {
    allContentfulPost: {
      nodes: {
        slug: string;
      }[];
    };
  };

  const contentfulPosts: { data?: ContentfulQueryResult; errors?: any } =
    await graphql(`
      query {
        allContentfulPost {
          nodes {
            slug
          }
        }
      }
    `);
  interface TagQueryResult {
    allContentfulPostTags: {
      nodes: {
        tag: string;
        friendlyName: string;
      }[];
    };
  }

  const allTags: { data?: TagQueryResult; errors?: any } = await graphql(`
    query {
      allContentfulPostTags(sort: { tag: ASC }) {
        nodes {
          tag
          friendlyName
        }
      }
    }
  `);

  if (contentfulPosts.errors || allTags.errors) {
    reporter.panicOnBuild(
      'Error loading Contentful result',
      contentfulPosts.errors,
    );
    return;
  }

  contentfulPosts.data?.allContentfulPost.nodes.forEach(node => {
    createPage({
      path: '/posts' + node.slug,
      component: contentfulPageTemplate,
      context: { slug: node.slug },
    });
  });

  allTags?.data?.allContentfulPostTags.nodes.forEach(node => {
    createPage({
      path: '/tag/' + node.tag,
      component: tagPageTemplate,
      context: {
        tag: node,
        tagRegex: `/${node.tag}/i`,
      },
    });
  });
};

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({
  actions,
  createContentDigest,
}) => {
  const { createNode } = actions;

  try {
    // Fetch quotes from the API
    const response = await axios.get<
      { id: string; author: string; quote: string }[]
    >('https://7qt946zi8d.execute-api.us-east-1.amazonaws.com/dev/quotes');

    const quotes = response.data;

    // Create nodes for each quote
    quotes.forEach((quote, index) => {
      createNode({
        id: quote.id || `quote-${index}`,
        author: quote.author,
        quote: quote.quote,
        internal: {
          type: 'Quote',
          contentDigest: createContentDigest(quote),
        },
      });
    });
  } catch (error) {
    console.error('Error fetching quotes:', error);
  }
};
