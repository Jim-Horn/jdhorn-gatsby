import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';

type PostsProps = {
  heading?: string;
}

type PostNode = {
  id: string;
  frontmatter: {
    title: string;
    slug: string;
    date: string;
    dateDiff: string;
  };
  excerpt: string;
}

const PostListItem = styled.li``;

const PostList = styled.ul`
  display: flex;
  flex-direction: column;

  ${PostListItem} {
    margin-bottom: 0;
  }
`;

const Posts: React.FC<PostsProps> = ({ heading = 'All posts' }) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(sort: { frontmatter: { date: DESC } }) {
        nodes {
          id
          frontmatter {
            slug
            date
            dateDiff: date(fromNow: true)
            seoTitle
            title
            tags
          }
          excerpt
        }
      }
    }
  `);

  const nodes: PostNode[] = data.allMdx.nodes || [];

  return (
    <section>
      <h2>{heading}</h2>
      <PostList>
        {nodes.length ? (
          nodes.map(({ id, frontmatter, excerpt }) => (
            <PostListItem key={id}>
              <Link
                to={`/posts${frontmatter.slug}`}
                title={`${excerpt && `${excerpt}\n\n`}${frontmatter.date} (${
                  frontmatter.dateDiff
                })`}>
                {frontmatter.title}
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
