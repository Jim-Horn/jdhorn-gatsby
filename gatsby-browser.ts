import React from 'react';
import { AuthProvider } from './src/components/AuthContext';
export const onClientEntry = () => {
  if (process.env.NODE_ENV === 'production') {
    console.log('Removing React Devtools');
    if (typeof (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
      for (const [key, value] of Object.entries(
        (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__,
      )) {
        (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__[key] =
          typeof value === 'function' ? () => {} : null;
      }
    }
  }
};

export const wrapRootElement = ({ element }: { element: React.ReactNode }) =>
  React.createElement(AuthProvider, null, element);
