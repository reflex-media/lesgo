import middy from 'middy';
import httpMiddleware from 'Lesgo/Middlewares/httpMiddleware';
import { connectSentry } from 'Lesgo/Utils/sentry';
import { dispatch } from 'Lesgo/Utils/queue';
import app from 'Config/app';

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
