import * as React from 'react';
import Codepen from 'react-codepen-embed';

const Code = ({
  hash,
  height = 300,
  defaultTab = 'js',
}: {
  hash: string;
  height: number;
  defaultTab: string;
}) => (
  <Codepen
    user="JDHorn"
    defaultTab={defaultTab}
    hash={hash}
    height={height}
    // @ts-ignore
    loader={() => <div>Loading...</div>}
  />
);

export default Code;
