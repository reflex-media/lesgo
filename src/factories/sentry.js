import sentryConfig from 'Config/sentry';

export const connectSentry = () => {
  // Leave to use process.env so that it can be removed from webpack build
  /* istanbul ignore else */
  if (process.env.SENTRY_BUNDLED) {
    // eslint-disable-next-line  global-require
    const Sentry = require('@sentry/node');
    Sentry.init({ dsn: sentryConfig.dsn });
  }
};

export default connectSentry;
