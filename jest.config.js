/**
 * Jest configuration file
 */
module.exports = {
  // Transform files with jest-preprocess.js (which uses babel-preset-gatsby)
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/jest-preprocess.js',
  },

  // Module name mappers for handling static assets
  moduleNameMapper: {
    // Handle CSS imports (with and without CSS modules)
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',

    // Handle image and other file imports
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',

    // Handle module aliases from tsconfig
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },

  // Ignore patterns
  testPathIgnorePatterns: ['node_modules', '\\.cache', '<rootDir>.*/public'],
  transformIgnorePatterns: [
    'node_modules/(?!(gatsby|gatsby-script|gatsby-link)/)',
  ],

  // Gatsby-specific settings
  globals: {
    __PATH_PREFIX__: '',
  },

  // Test environment and setup
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/loadershim.js'],
  setupFilesAfterEnv: [
    '<rootDir>/setup-test-env.js',
    '<rootDir>/jest.setup.js',
  ],

  // Test file patterns
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],

  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
