# Testing Infrastructure

## Overview

The testing infrastructure uses Jest with React Testing Library for unit and component testing. The setup is configured for Gatsby's specific requirements.

## Configuration

### Jest Config

Located in `jest.config.js`:

```javascript
module.exports = {
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/jest-preprocess.js',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  testPathIgnorePatterns: ['node_modules', '\\.cache', '<rootDir>.*/public'],
  transformIgnorePatterns: [
    'node_modules/(?!(gatsby|gatsby-script|gatsby-link)/)',
  ],
  globals: {
    __PATH_PREFIX__: '',
  },
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/loadershim.js'],
  setupFilesAfterEnv: [
    '<rootDir>/setup-test-env.js',
    '<rootDir>/jest.setup.js',
  ],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
```

## Key Files

### jest-preprocess.js

Babel preprocessing for TypeScript and JSX:

```javascript
const babelOptions = {
  presets: ['babel-preset-gatsby'],
};
module.exports = require('babel-jest').default.createTransformer(babelOptions);
```

### loadershim.js

Gatsby loader shim for testing:

```javascript
global.___loader = {
  enqueue: jest.fn(),
};
```

### setup-test-env.js

Test environment setup (Gatsby-specific).

### jest.setup.js

Jest setup file for test configuration.

## Test Files

### Component Tests

- `src/components/AuthContext.test.tsx` - Authentication context tests
- `src/components/ExternalLink.test.tsx` - External link component tests
- `src/components/Header.test.tsx` - Header component tests
- `src/components/ListTags.test.tsx` - Tag list component tests
- `src/components/Seo.test.tsx` - SEO component tests
- `src/components/KaprekarCalculator/KaprekarCalculator.test.tsx` - Calculator tests

### Utility Tests

- `src/utils/consolidatePostTags.test.ts` - Tag consolidation tests
- `src/utils/getTabs.test.tsx` - Tab utility tests
- `src/components/PassWords/utils.test.ts` - PassWords utility tests

### Hook Tests

- `src/hooks/useSession/useSession.test.ts` - Session hook tests

## Testing Libraries

### Dependencies

- `jest` - Testing framework
- `@testing-library/react` - React component testing
- `@testing-library/jest-dom` - DOM matchers
- `@testing-library/dom` - DOM utilities
- `jest-environment-jsdom` - Browser environment
- `babel-jest` - Babel transformer
- `ts-jest` - TypeScript support
- `identity-obj-proxy` - CSS module mocking

## Test Structure

### Example Test

```typescript
import { render, screen } from '@testing-library/react';
import { Seo } from './Seo';

describe('Seo', () => {
  it('renders page title', () => {
    render(<Seo title="Test Title" description="Test description" />);
    expect(document.title).toBe('Test Title | jdhorn.com');
  });
});
```

## Mocks

### File Mocks

`__mocks__/fileMock.js`:
```javascript
module.exports = 'test-file-stub';
```

Mocks static file imports (images, fonts, etc.).

### CSS Mocks

CSS imports are mocked using `identity-obj-proxy`:
- Returns class names as-is
- No actual CSS processing

## Gatsby-Specific Setup

### Path Prefix

```javascript
globals: {
  __PATH_PREFIX__: '',
}
```

### Loader Shim

```javascript
global.___loader = {
  enqueue: jest.fn(),
};
```

### Transform Ignore

Gatsby packages are transformed:
```javascript
transformIgnorePatterns: [
  'node_modules/(?!(gatsby|gatsby-script|gatsby-link)/)',
]
```

## Test Scripts

### Available Commands

```bash
yarn test              # Run tests once
yarn test:watch        # Watch mode
yarn test:coverage     # Coverage report
yarn test:update       # Update snapshots
```

## Test Patterns

### File Naming

- `*.test.ts` - TypeScript tests
- `*.test.tsx` - React component tests
- `*.spec.ts` - Alternative naming

### Test Organization

Tests are co-located with source files:
```
src/
├── components/
│   ├── Seo.tsx
│   └── Seo.test.tsx
└── utils/
    ├── consolidatePostTags.ts
    └── consolidatePostTags.test.ts
```

## Coverage

### Configuration

Coverage can be generated with:
```bash
yarn test:coverage
```

### Reports

Coverage reports show:
- Statement coverage
- Branch coverage
- Function coverage
- Line coverage

## Best Practices

1. **Co-location** - Tests next to source files
2. **Descriptive Names** - Clear test descriptions
3. **Isolation** - Tests are independent
4. **Mocking** - External dependencies mocked
5. **Coverage** - Aim for high coverage

## Future Enhancements

Potential improvements:
- E2E testing (Cypress, Playwright)
- Visual regression testing
- Performance testing
- Accessibility testing
- Snapshot testing expansion

---

_Last updated: December 20, 2025_

