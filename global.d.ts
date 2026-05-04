declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: {
      [key: string]: any;
    };
    /** Google Tag Manager (gatsby-plugin-google-tagmanager) */
    dataLayer?: Record<string, unknown>[];
  }
}

export {};
