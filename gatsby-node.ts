const path = require('path');
const postTemplate = path.resolve(`./src/templates/post.tsx`);
const tagPageTemplate = path.resolve(`./src/templates/tag.tsx`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
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

  const allTags = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            tags
          }
        }
      }
    }
  `);

  if (result.errors || allTags.erros) {
    reporter.panicOnBuild('Error loading MDX result', result.errors);
  }

  const posts = result.data.allMdx.nodes;

  posts.forEach(node => {
    createPage({
      // As mentioned above you could also query something else like frontmatter.title above and use a helper function
      // like slugify to create a slug
      path: '/posts' + node.frontmatter.slug,
      // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    });
  });

  const { nodes } = allTags.data.allMdx;

  const tags = [
    ...new Set(
      nodes
        .reduce(
          (acc, node) => acc.concat(node.frontmatter.tags.split(', ')),
          []
        )
        .map(tag => tag.toLowerCase())
        .sort()
    ),
  ];

  tags.forEach(tag => {
    createPage({
      path: '/tag/' + tag,
      component: tagPageTemplate,
      context: {
        tagRegex: `/${tag}/i`,
        tag,
      },
    });
  });
};
