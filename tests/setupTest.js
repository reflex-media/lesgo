/* eslint no-console: 0 */

// Add test-specific environment configurations
process.env.APP_ENV = 'test';
process.env.APP_DEBUG = true;
process.env.AWS_ACCOUNT_REGION = 'ap-southeast-1';
process.env.AWS_ACCOUNT_ID = '111111111111';
process.env.SENTRY_BUNDLED = true;

jest.mock('lesgo', () => {
  return {
    dispatch: jest.fn(() => Promise.resolve({ MessageId: 'MessageId' })),
    logger: {
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
      debug: jest.fn(),
      log: jest.fn(),
    },
  };
});
