# jdhorn.com - System Documentation

This documentation provides an overview of all major systems in the jdhorn.com Gatsby-based website.

## Overview

jdhorn.com is a personal website built with Gatsby, React, and TypeScript. It features a blog powered by Contentful CMS, interactive web tools, and quote management.

## Major Systems

### Core Infrastructure

1. [Gatsby Framework & Build System](./gatsby-framework.md)
   - Core Gatsby configuration and plugins
   - Build process and optimization
   - Development and production workflows

2. [Contentful CMS Integration](./contentful-integration.md)
   - Content management system setup
   - GraphQL data layer
   - Content synchronization

3. [Content Models](./content-models.md)
   - Post content model
   - CodeBlock, CodePen, and ExternalLink models
   - PostTags taxonomy system

### Page & Content Management

4. [Dynamic Page Generation](./page-generation.md)
   - Programmatic page creation
   - Post and tag page templates
   - GraphQL queries for content

5. [Tagging System](./tagging-system.md)
   - Post tagging functionality
   - Tag-based navigation
   - Tag page generation

### User Features

6. [Web Toys](./web-toys.md)
   - Kaprekar's Calculator
   - PassWords generator
   - Interactive components

7. [Quote System](./quote-system.md)
   - External API integration
   - Quote display and management
   - Random quote selection

### Legacy/Removed Systems

8. [Authentication System](./authentication.md) - **REMOVED**
   - Was a password-based authentication system
   - Built for admin system (also removed)
   - Removed on December 20, 2025

9. [Admin System](./admin-system.md) - **REMOVED**
   - Was a skeleton/placeholder - incomplete side project
   - Removed on December 20, 2025

### Technical Systems

10. [Component Library](./component-library.md)
    - Reusable React components
    - Layout components
    - UI components

11. [Styling System](./styling-system.md)
    - Styled-components integration
    - CSS architecture
    - Responsive design

12. [SEO & Analytics](./seo-analytics.md)
    - Google Analytics integration
    - Google Tag Manager
    - SEO component and metadata

13. [Testing Infrastructure](./testing.md)
    - Jest configuration
    - Test utilities and setup
    - Component testing

14. [Deployment System](./deployment.md)
    - Netlify deployment configuration
    - Build optimization
    - Environment variables

## Additional Documentation

- [Improvement Suggestions](./improvement-suggestions.md) - Recommendations for code quality, security, and feature enhancements

## Quick Links

- [Project Repository](https://github.com/Jim-Horn/jdhorn-gatsby)
- [Live Site](https://jdhorn.com/)
- [Gatsby Documentation](https://www.gatsbyjs.com/docs/)

---

_Last updated: December 20, 2025_
