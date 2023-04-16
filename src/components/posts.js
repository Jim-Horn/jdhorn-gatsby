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
      allMdx(sort: { frontmatter: { date: DESC } }) {
        nodes {
          frontmatter {
            slug
            date
            dateDiff: date(fromNow: true)
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
  const { nodes } = data.allMdx;
  return (
    <section>
      <h2>{heading}</h2>
      <PostList>
        {nodes ? (
          nodes.map((post, id) => (
            <PostListItem key={id}>
              <Link
                to={'/posts' + post.frontmatter.slug}
                title={`${post.frontmatter.date} (${post.frontmatter.dateDiff})`}>
                {post.frontmatter.title}
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
