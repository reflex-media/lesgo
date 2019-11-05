/* eslint no-console: 0 */

// Add test-specific environment configurations
process.env.APP_ENV = 'test';
process.env.APP_DEBUG = true;
process.env.AWS_ACCOUNT_REGION = 'ap-southeast-1';
process.env.AWS_ACCOUNT_ID = '111111111111';
process.env.SENTRY_BUNDLED = true;

jest.mock('lesgo/utils', () => {
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

jest.mock('../src/models/User', () =>
  jest.fn(() => ({
    init: jest.fn(),
    sequelize: {
      close: jest.fn(),
    },
    findOne: jest.fn(() => {
      return Promise.resolve({
        name: 'Daison Carino',
        email: 'daison12006013@gmail.com',
        email_verified_at: '2019-10-23 12:00:00',
        remember_token: 'abcdefghijklmnopqrstuvwxyz',
        created_at: '2019-10-22 12:00:00',
        updated_at: '2019-10-22 12:00:00',
      });
    }),
  }))
);
