import { connectSentry } from 'Utils/sentry';

describe('test sentry utils', () => {
  it('should connect to sentry', () => {
    connectSentry();
  });
});
