/* eslint-disable no-console */
import middy from 'middy';
import httpMiddleware from 'lesgo/middlewares/httpMiddleware';
import { connectSentry } from 'lesgo/utils/sentry';
import app from 'config/app';
import ping from 'core/ping';

connectSentry();

const originalHandler = event => {
  return ping(event.input);
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
