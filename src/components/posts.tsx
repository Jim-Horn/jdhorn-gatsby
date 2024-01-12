import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';

const PostListItem = styled.li``;

const PostList = styled.ul`
  display: flex;
  flex-direction: column;

  ${PostListItem} {
    margin-bottom: 0;
  }
`;

interface PostsProps {
  heading?: string;
}

interface Post {
  contentful_id: string;
  slug: string;
  date: string;
  dateDiff: string;
  title: string;
}

const Posts: React.FC<PostsProps> = ({ heading = 'All posts' }) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulPost(sort: { updatedAt: DESC }) {
        nodes {
          contentful_id
          slug
          date
          dateDiff: date(fromNow: true)
          title
        }
      }
    }
  `);

  const { nodes } = data.allContentfulPost;

  return (
    <section>
      <h2>{heading}</h2>
      <PostList>
        {nodes.length ? (
          nodes.map(({ contentful_id, slug, date, dateDiff, title }: Post) => (
            <PostListItem key={contentful_id}>
              <Link to={`/posts${slug}`} title={`${date} (${dateDiff})`}>
                {title}
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
