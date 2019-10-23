import { connectSentry } from 'Factories/sentry';

describe('test sentry utils', () => {
  it('should connect to sentry', () => {
    connectSentry();
  });
});
