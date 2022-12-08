import { connectSentry } from 'lesgo/utils/sentry';

describe('test sentry utils', () => {
  it('should connect to sentry', () => {
    connectSentry();
  });
});
