import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { Link } from 'gatsby';

const PostListItem = styled.li``;
const PostList = styled.ul`
  display: flex;
  flex-direction: column;

  ${PostListItem} {
    margin-bottom: 0;
  }
`;

const Posts = ({ heading = 'All posts' }) => {
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

  const posts = [...data.allMdx.nodes, ...data.allMarkdownRemark.nodes];
  return (
    <>
      <h2>{heading}</h2>
      <PostList>
        {posts &&
          posts.map((post, id) => (
            <PostListItem key={id}>
              <Link
                to={'/posts' + post.frontmatter.slug}
                title={post.frontmatter.seoTitle}>
                {post.frontmatter.title} ({post.frontmatter.date})
              </Link>
            </PostListItem>
          ))}
      </PostList>
    </>
  );
};

export default Posts;
