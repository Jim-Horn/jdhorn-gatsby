export const onClientEntry = () => {
  if (process.env.NODE_ENV === 'production') {
    console.log('Removing React Devtools');
    if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
      for (const [key, value] of Object.entries(
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__,
      )) {
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] =
          typeof value === 'function' ? () => {} : null;
      }
    }
  }
};
