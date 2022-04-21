import middy from 'middy';
import httpMiddleware from 'lesgo/middlewares/httpMiddleware';
import { connectSentry } from 'lesgo/utils/sentry';
import { dispatch } from 'lesgo/utils/queue';
import app from 'config/app';

connectSentry();

const originalHandler = event => {
  const payload = {
    data: event.input,
  };

  return dispatch(payload, 'sampleQueue');
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
