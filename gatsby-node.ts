import { GatsbyNode } from 'gatsby';
import path from 'path';

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
