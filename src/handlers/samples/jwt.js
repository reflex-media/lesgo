import middy from 'middy';
import httpMiddleware from 'Lesgo/Middlewares/httpMiddleware';
import verifyJwtMiddleware from 'Lesgo/Middlewares/verifyJwtMiddleware';
import { connectSentry } from 'Lesgo/Utils/sentry';
import ping from 'Core/ping';
import app from 'Config/app';

connectSentry();

const originalHandler = event => {
  return ping(event.input);
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler
  .use(verifyJwtMiddleware())
  .use(httpMiddleware({ debugMode: app.debug }));
