import { graphql } from 'gatsby';
import * as React from 'react';

const ExternalLink = ({
  children,
  text,
}: {
  children: string;
  text?: string;
}) => {
  return (
    <a href={children} rel="noopener noreferrer" target="_blank">
      {text || children}
    </a>
  );
};

export default ExternalLink;

export const query = graphql`
  fragment ExternalLink on ContentfulExternalLink {
    __typename
    contentful_id
    url
    text
  }
`;
