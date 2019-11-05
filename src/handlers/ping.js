import middy from 'middy';
import { http } from 'lesgo/middlewares';
import { connectSentry } from 'Utils/sentry';
import ping from 'Core/ping';
import { app } from 'Config';

connectSentry();

const originalHandler = event => {
  return ping(event.input);
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(http({ debugMode: app.debug }));
