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
    '^Config(.*)$': '<rootDir>/src/config$1',
    '^Constants/errorCodes(.*)$': '<rootDir>/src/constants/errorCodes$1',
    '^Core(.*)$': '<rootDir>/src/core$1',
    '^Exceptions/ErrorException(.*)$':
      '<rootDir>/src/exceptions/ErrorException$1',
    '^Models(.*)$': '<rootDir>/src/models$1',
    '^Utils/logger$': '<rootDir>/tests/__mocks__/utils/logger.js',
    '^Utils/queue$': '<rootDir>/tests/__mocks__/utils/queue.js',
    '^Utils/database$': '<rootDir>/node_modules/lesgo/src/utils/database.js',
    '^Utils/sentry$': '<rootDir>/node_modules/lesgo/src/utils/sentry.js',
    '^@sentry/node$': '<rootDir>/node_modules/@sentry/node/dist/index.js',
  },
};
