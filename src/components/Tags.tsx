import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled, { css } from 'styled-components';

interface TagQueryData {
  allContentfulPostTags: {
    nodes: Array<{
      tag: string;
      friendlyName: string;
      post: Array<{
        title: string;
        slug: string;
      }>;
    }>;
  };
}

const ListCommon = css`
  list-style: none;
  padding: 0;
  margin: 0;
  > li > a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const TagsList = styled.ul`
  ${ListCommon};
  > li {
    margin-bottom: 1rem;
    & > a {
      color: inherit;
      font-size: 1.25rem;
      font-weight: 700;
    }
  }
`;

const PostsList = styled.ul`
  ${ListCommon};
  margin-left: 1rem;
  > li {
    margin-bottom: 0;
    & > a {
      color: #666;
      font-size: 1rem;
      font-weight: 400;
    }
  }
`;

const Tags: React.FC = () => {
  const data = useStaticQuery<TagQueryData>(graphql`
    query {
      allContentfulPostTags(sort: { friendlyName: ASC }) {
        nodes {
          tag
          friendlyName
          post {
            title
            slug
          }
        }
      }
    }
  `);

  const { nodes } = data.allContentfulPostTags;

  return (
    <TagsList>
      {nodes.map((node, index) => {
        const { tag, friendlyName, post } = node;
        return (
          <li key={index}>
            <Link to={`/tag/${tag}`}>{friendlyName}</Link>
            {post && (
              <>
                <PostsList>
                  {post
                    .sort((a, b) =>
                      a.title
                        .toLowerCase()
                        .localeCompare(b.title.toLowerCase()),
                    )
                    .map((post, index) => {
                      const { title, slug } = post;
                      return (
                        <li key={index}>
                          <Link to={`/post/${slug}`}>{title}</Link>
                        </li>
                      );
                    })}
                </PostsList>
              </>
            )}
          </li>
        );
      })}
    </TagsList>
  );
};

export default Tags;
