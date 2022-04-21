import middy from 'middy';
import httpMiddleware from 'lesgo/middlewares/httpMiddleware';
import { connectSentry } from 'lesgo/utils/sentry';
import ping from 'core/ping';
import app from 'config/app';
import exampleMiddleware from 'middlewares/exampleMiddleware';

connectSentry();

const originalHandler = event => {
  return ping(event.input);
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug })).use(exampleMiddleware());
