import { connectSentry } from 'Lesgo/Utils/sentry';

describe('test sentry utils', () => {
  it('should connect to sentry', () => {
    connectSentry();
  });
});
