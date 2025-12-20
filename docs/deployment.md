# Deployment System

## Overview

The site is deployed to Netlify with automated builds from the Git repository. The deployment configuration optimizes builds and handles environment variables.

## Netlify Configuration

### File

`netlify.toml` - Netlify deployment configuration

### Configuration

```toml
[build]
  # Specify Node.js version for builds
  environment = { NODE_VERSION = "22" }

  # Default build command for Gatsby
  command = "yarn build"
  
  # Default publish directory for Gatsby
  publish = "public"

[build.processing]
  skip_processing = false

[build.processing.css]
  bundle = true
  minify = true

[build.processing.js]
  bundle = true
  minify = true

[build.processing.html]
  pretty_urls = true
```

## Build Configuration

### Node Version

- **Version**: Node.js 22
- **Specified**: In `netlify.toml`

### Build Command

```bash
yarn build
```

Runs Gatsby build process:
1. Source nodes (Contentful, quotes API)
2. Create pages
3. Optimize images
4. Generate static files

### Publish Directory

- **Directory**: `public/`
- **Contains**: Static HTML, CSS, JS, images

## Build Processing

### CSS Processing

- **Bundle**: Enabled
- **Minify**: Enabled
- **Optimization**: Automatic

### JavaScript Processing

- **Bundle**: Enabled
- **Minify**: Enabled
- **Code Splitting**: Automatic

### HTML Processing

- **Pretty URLs**: Enabled
- **Clean URLs**: Automatic (e.g., `/about` not `/about.html`)

## Environment Variables

### Required Variables

Set in Netlify dashboard:

1. **CONTENTFUL_ACCESS_TOKEN**
   - Contentful API access token
   - Used for fetching content

2. **GATSBY_ADMIN_PASSWORD**
   - Admin authentication password
   - Available in browser (GATSBY_ prefix)

### Configuration

- **Location**: Netlify Site Settings → Environment Variables
- **Scoping**: Can be set per environment (production, deploy previews)

## Deployment Workflow

### Automatic Deploys

1. **Push to main branch** → Production deploy
2. **Pull requests** → Deploy previews
3. **Build status** → Shown in PR comments

### Build Process

1. Install dependencies (`yarn install`)
2. Run build command (`yarn build`)
3. Process assets (CSS, JS, HTML)
4. Deploy to CDN
5. Invalidate cache

## Build Optimization

### Gatsby Optimizations

- **Image Optimization**: Automatic via gatsby-plugin-sharp
- **Code Splitting**: Route-based
- **Asset Optimization**: Minification and compression
- **Static Generation**: All pages pre-rendered

### Netlify Optimizations

- **CDN**: Global content delivery
- **Asset Compression**: Automatic
- **HTTP/2**: Enabled
- **Cache Headers**: Optimized

## Status Badge

### Badge

Shown in README.md:

```markdown
[![Netlify Status](https://api.netlify.com/api/v1/badges/c3c6add6-605c-4d0e-8e7a-92f0a6b2211b/deploy-status)](https://app.netlify.com/sites/jdhorn/deploys)
```

### Purpose

- Shows build status
- Links to Netlify dashboard
- Visual deployment status

## Deploy Previews

### Pull Requests

Each PR gets a deploy preview:
- Unique URL
- Full build
- Environment variables available
- Testing before merge

### Benefits

- Test changes before production
- Share previews with team
- Catch build errors early

## Build Logs

### Access

- Netlify dashboard
- Build logs show:
  - Dependencies installation
  - Build steps
  - Errors and warnings
  - Build time

## Cache Management

### Gatsby Cache

- `.cache/` - Build cache
- `public/` - Output directory
- Cleared with `yarn clean`

### Netlify Cache

- Dependency cache
- Build cache
- Asset cache

## Domain Configuration

### Custom Domain

- **Domain**: jdhorn.com
- **SSL**: Automatic via Let's Encrypt
- **DNS**: Configured in Netlify

## Performance

### Build Time

- Typical: 2-5 minutes
- Depends on:
  - Content amount
  - Image processing
  - API response times

### Site Performance

- **CDN**: Global edge network
- **Caching**: Aggressive caching
- **Compression**: Automatic

## Monitoring

### Build Status

- Success/failure notifications
- Email alerts (optional)
- Slack integration (optional)

### Site Monitoring

- Uptime monitoring
- Performance monitoring
- Error tracking (potential)

## Rollback

### Process

1. Go to Netlify dashboard
2. Select previous deploy
3. Click "Publish deploy"
4. Site rolls back instantly

## Best Practices

1. **Environment Variables** - Secure storage
2. **Build Optimization** - Fast builds
3. **Cache Management** - Efficient caching
4. **Monitoring** - Track builds and performance
5. **Rollback Plan** - Quick recovery

## Future Enhancements

Potential improvements:
- Staging environment
- A/B testing
- Advanced caching strategies
- Performance budgets
- Build notifications
- Automated testing in CI/CD

---

_Last updated: December 20, 2025_

