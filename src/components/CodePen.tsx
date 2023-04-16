import * as React from 'react';
import Codepen from 'react-codepen-embed';

const Pen = ({
  hash,
  height = 300,
  defaultTab = 'js',
  editable = false,
}: {
  hash: string;
  height: number;
  defaultTab: string;
  editable: boolean;
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

export default Pen;
