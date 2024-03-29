import { graphql } from 'gatsby';
import * as React from 'react';
import Codepen from 'react-codepen-embed';

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
    // @ts-ignore
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
