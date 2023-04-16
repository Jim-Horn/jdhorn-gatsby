import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const TagListItem = styled.li``;
const TagList = styled.ul`
  list-style: none;
  margin: 0;
  display: flex;

  ${TagListItem} {
    margin-bottom: 0;
    margin-right: 0.5rem;
    &:last-child {
      margin-right: 0;
    }
    a {
      font-size: small;
      border: 1px solid blue;
      border-radius: 0.75rem;
      padding: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: blue;

      &::before {
        content: '#';
      }

      &:hover {
        transition: 0.5s;
        background: blue;
        color: white;
      }
    }
  }
`;

const ListTags = tags => {
  const tagArr = tags.tags.split(',');
  const tagPage = `/tag`;
  return (
    <TagList>
      {tagArr.map((tag, index) => {
        tag = tag.trim();
        return (
          <TagListItem key={index}>
            <Link to={`${tagPage}/${tag}`}>{tag}</Link>
          </TagListItem>
        );
      })}
    </TagList>
  );
};

export default ListTags;
