/* eslint-disable no-console */
import middy from '@middy/core';
import httpMiddleware from 'Middlewares/httpMiddleware';
import { connectSentry } from 'Utils/sentry';
import app from 'Config/app';
import ping from 'Core/ping';

connectSentry();

const originalHandler = event => {
  return ping(event.input);
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
