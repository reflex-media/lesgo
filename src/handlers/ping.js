import middy from 'middy';
import httpMiddleware from 'lesgo/src/middlewares/httpMiddleware';
import { connectSentry } from 'Utils/sentry';
import ping from 'Core/ping';
import app from 'Config/app';

connectSentry();

const originalHandler = event => {
  return ping(event.input);
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
