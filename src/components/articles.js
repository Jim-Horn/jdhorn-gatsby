import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { Link } from 'gatsby';

const ArticleListItem = styled.li``;
const ArticleList = styled.ul`
  display: flex;
  flex-direction: column;

  ${ArticleListItem} {
    margin-bottom: 0;
  }
`;

const Articles = ({ Heading: 'All articles' }) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          frontmatter {
            slug
            date
            seoTitle
            title
            tags
          }
          internal {
            type
          }
        }
      }
      allMarkdownRemark {
        nodes {
          frontmatter {
            slug
            date
            seoTitle
            title
            tags
          }
          internal {
            type
          }
        }
      }
    }
  `);

  const articles = [...data.allMdx.nodes, ...data.allMarkdownRemark.nodes];
  return (
    <>
      <h2>{heading}</h2>
      <ArticleList>
        {articles &&
          articles.map((article, id) => (
            <ArticleListItem key={id}>
              <Link
                to={'/articles' + article.frontmatter.slug}
                title={article.frontmatter.seoTitle}>
                {article.frontmatter.title} ({article.frontmatter.date})
              </Link>
            </ArticleListItem>
          ))}
      </ArticleList>
    </>
  );
};

export default Articles;
