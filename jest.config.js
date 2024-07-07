module.exports = {
  verbose: true,
  testMatch: ['**/__tests__/*.test.ts'],
  collectCoverageFrom: ['src/**/*.ts'],
  coverageReporters: ['html', 'text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  setupFiles: ['./jest.setup.ts'],
  transformIgnorePatterns: ['/node_modules/(?!lesgo).+\\.js$'],
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Lesgo test coverage report',
        outputPath: 'coverage/test-report/index.html',
      },
    ],
  ],
};
