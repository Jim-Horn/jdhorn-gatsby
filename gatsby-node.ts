import { GatsbyNode } from 'gatsby';
import path from 'path';

const postTemplate = path.resolve(`./src/templates/post.tsx`);
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

  // Define types for your query results
  type MdxQueryResult = {
    allMdx: {
      nodes: {
        id: string;
        frontmatter: {
          slug: string;
          tags?: string;
        };
        internal: {
          contentFilePath: string;
        };
      }[];
    };
  };

  type ContentfulQueryResult = {
    allContentfulPost: {
      nodes: {
        slug: string;
      }[];
    };
  };

  const mdxPages: { data?: MdxQueryResult; errors?: any } = await graphql(`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

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

  if (mdxPages.errors || contentfulPosts.errors || allTags.errors) {
    reporter.panicOnBuild('Error loading MDX result', mdxPages.errors);
    return;
  }

  const posts = mdxPages.data?.allMdx.nodes;

  posts?.forEach(node => {
    createPage({
      path: '/old-md' + node.frontmatter.slug,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { id: node.id },
    });
  });

  contentfulPosts.data?.allContentfulPost.nodes.forEach(node => {
    createPage({
      path: '/posts' + node.slug,
      component: `${contentfulPageTemplate}`,
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
