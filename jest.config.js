module.exports = {
  verbose: true,
  testMatch: ['**/tests/*.spec.js', '**/tests/**/*.spec.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/config.js',
    '!src/handlers/**/*.js',
  ],
  coverageReporters: ['html', 'text', 'lcov'],
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80,
  //   },
  // },
  setupFiles: ['./tests/setupTest.js'],
  moduleNameMapper: {
    // This will be removed in the future versions
    '^Config(.*)$': '<rootDir>/src/config$1',
    // This will be removed in the future versions
    '^Constants/errorCodes(.*)$': '<rootDir>/src/constants/errorCodes$1',
    // This will be removed in the future versions
    '^Core(.*)$': '<rootDir>/src/core$1',
    // This will be removed in the future versions
    '^Exceptions/ErrorException(.*)$':
      '<rootDir>/src/exceptions/ErrorException$1',
    // This will be removed in the future versions
    '^Models(.*)$': '<rootDir>/src/models$1',
    '^config(.*)$': '<rootDir>/src/config$1',
    '^constants/errorCodes(.*)$': '<rootDir>/src/constants/errorCodes$1',
    '^core(.*)$': '<rootDir>/src/core$1',
    '^exceptions/ErrorException(.*)$':
      '<rootDir>/src/exceptions/ErrorException$1',
    '^models(.*)$': '<rootDir>/src/models$1',
    '^lesgo/utils/logger$': '<rootDir>/tests/__mocks__/utils/logger.js',
    '^lesgo/utils/queue$': '<rootDir>/tests/__mocks__/utils/queue.js',
    '^lesgo/utils/sentry$': '<rootDir>/node_modules/lesgo/src/utils/sentry.js',
    '^lesgo/utils/database$':
      '<rootDir>/node_modules/lesgo/src/utils/database.js',
    '^@sentry/node$': '<rootDir>/node_modules/@sentry/node/dist/index.js',
  },
  transformIgnorePatterns: ['/node_modules/(?!lesgo).+\\.js$'],
};
