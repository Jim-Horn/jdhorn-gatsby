import * as React from 'react';
import Codepen from 'react-codepen-embed';

const Code = ({ hash }: { hash: string }) => (
  <Codepen
    user="JDHorn"
    defaultTab="js"
    hash={hash}
    // @ts-ignore
    loader={() => <div>Loading...</div>}
  />
);

export default Code;
