import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import ListTags from './ListTags';
import { consolidatePostTags } from '../utils';

const PostListItem = styled.li``;

const PostList = styled.ul`
  display: flex;
  flex-direction: column;

  ${PostListItem} {
    & > ul {
      margin-top: 0.5rem;
    }
    margin-bottom: 1rem;
    ul {
      margin-left: 0.5rem;
    }
  }
`;

const SmallAbbr = styled.abbr`
  font-size: 0.8rem;
`;

interface PostsProps {
  heading?: string | null;
  showTags?: boolean;
  showDate?: boolean;
}

interface Post {
  contentful_id: string;
  slug: string;
  date: string;
  dateDiff: string;
  title: string;
  postTags: Array<{
    tag: string;
    friendlyName: string;
  }>;
}

const Posts: React.FC<PostsProps> = ({
  heading = 'All posts',
  showTags = false,
  showDate = false,
}) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulPost(sort: { date: DESC }) {
        nodes {
          contentful_id
          slug
          date(formatString: "ddd, MMMM DD, YYYY")
          dateDiff: date(fromNow: true)
          title
          postTags {
            tag
            friendlyName
          }
        }
      }
    }
  `);

  const { nodes } = data.allContentfulPost;

  return (
    <section>
      {heading && <h2>{heading}</h2>}
      <PostList>
        {nodes.length ? (
          nodes.map(
            ({
              contentful_id,
              slug,
              date,
              dateDiff,
              title,
              postTags,
            }: Post) => (
              <PostListItem key={contentful_id}>
                <Link to={`/posts${slug}`} title={`${date} (${dateDiff})`}>
                  {title}
                </Link>
                {showDate && (
                  <>
                    <br />
                    <SmallAbbr title={`About ${dateDiff}`}>{date}</SmallAbbr>
                  </>
                )}
                {showTags && <ListTags tags={consolidatePostTags(postTags)} />}
              </PostListItem>
            ),
          )
        ) : (
          <p>No posts found</p>
        )}
      </PostList>
    </section>
  );
};

export { Posts };
