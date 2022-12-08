import middy from '@middy/core';
import httpMiddleware from 'lesgo/middlewares/httpMiddleware';
import verifyJwtMiddleware from 'lesgo/middlewares/verifyJwtMiddleware';
import { connectSentry } from 'lesgo/utils/sentry';
import ping from 'core/ping';
import app from 'config/app';

connectSentry();

const originalHandler = event => {
  return ping(event.input);
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler
  .use(verifyJwtMiddleware())
  .use(httpMiddleware({ debugMode: app.debug }));
