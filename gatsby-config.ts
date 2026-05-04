/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */

require('dotenv').config();

/** Canonical origin (no trailing slash); used for sitemap / robots URLs */
const SITE_HOST = `https://jdhorn.com`;

module.exports = {
  siteMetadata: {
    title: `jdhorn.com`,
    description: `Jim Horn's website`,
    author: `@jdhorn`,
    siteUrl: `${SITE_HOST}/`,
  },
  plugins: [
    `gatsby-plugin-netlify`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jim Horn's website`,
        short_name: `jdhorn.com`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/jdhorn-favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-P659SBM4',
        // Load GTM in `gatsby develop` so you can verify tags before publish.
        includeInDevelopment: true,
        defaultDataLayer: { platform: 'gatsby' },
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `5fb4xoh9wju8`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: SITE_HOST,
        // gatsby-plugin-sitemap writes sitemap-index.xml at site root (not /sitemap/)
        sitemap: `${SITE_HOST}/sitemap-index.xml`,
        policy: [{ userAgent: `*`, allow: `/` }],
      },
    },
    // Keep last: https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap/
    `gatsby-plugin-sitemap`,
  ],
};
