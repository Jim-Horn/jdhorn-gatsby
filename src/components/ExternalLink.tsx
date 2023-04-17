import * as React from 'react';

const ExternalLink = ({ children }: { children: string }) => (
  <a href={children} rel="noopener noreferrer" target="_blank">
    {children}
  </a>
);

export default ExternalLink;
