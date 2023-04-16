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
    }
  `);

  const posts = [...data.allMdx.nodes].sort((a, b) =>
    a.frontmatter.date < b.frontmatter.date ? 1 : -1
  );
  return (
    <section>
      <h2>{heading}</h2>
      <PostList>
        {posts ? (
          posts.map((post, id) => (
            <PostListItem key={id}>
              <Link
                to={'/posts' + post.frontmatter.slug}
                title={post.frontmatter.seoTitle}>
                {post.frontmatter.title} ({post.frontmatter.date})
              </Link>
            </PostListItem>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </PostList>
    </section>
  );
};

export default Posts;
