export default {
  name: process.env.APP_NAME,
  env: process.env.APP_ENV || /* istanbul ignore next */ process.env.NODE_ENV,
  debug: process.env.APP_DEBUG === 'true',
};
