import middy from 'middy';
import { httpMiddleware } from 'lesgo';
import { connectSentry } from 'Utils/sentry';
import { app } from 'Config';
// import ec from 'Utils/elastiCache';

connectSentry();

const originalHandler = async () => {};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
