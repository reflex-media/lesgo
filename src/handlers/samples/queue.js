import middy from '@middy/core';
import httpMiddleware from 'Middlewares/httpMiddleware';
import { connectSentry } from 'Utils/sentry';
import app from 'Config/app';
import { dispatch } from 'Utils/queue';

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
