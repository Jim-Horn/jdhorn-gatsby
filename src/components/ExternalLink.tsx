import { graphql } from 'gatsby';
import * as React from 'react';

const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children?: React.ReactNode;
}) => {
  return (
    <a href={href} rel="noopener noreferrer" target="_blank">
      {children || href}
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
