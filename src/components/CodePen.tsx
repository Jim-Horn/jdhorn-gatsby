import { graphql } from 'gatsby';
import * as React from 'react';
import Codepen from 'react-codepen-embed';

declare module 'react-codepen-embed' {
  interface Props {
    /** Embed API version. The library used to set this with function defaultProps. */
    version?: number;
  }
}

type PenProps = {
  hash: string;
  height?: number;
  defaultTab?: string;
  editable?: boolean;
};

const CodePen: React.FC<PenProps> = ({
  hash,
  height = 300,
  defaultTab = 'js',
  editable = false,
}) => (
  <Codepen
    user="JDHorn"
    defaultTab={defaultTab}
    hash={hash}
    height={height}
    editable={editable}
    themeId="dark"
    preview
    version={2}
    // @ts-ignore library types the loader as a node, but it renders it as a component
    loader={() => <div>Loading...</div>}
  />
);

export { CodePen };

export const codePenQuery = graphql`
  fragment CodePen on ContentfulCodePen {
    contentful_id
    __typename
    hash
    editable
    height
    defaultTab
    showResult
  }
`;
