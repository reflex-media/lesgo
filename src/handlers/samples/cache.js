/* eslint-disable no-console */
import middy from 'middy';
import httpMiddleware from 'lesgo/src/middlewares/httpMiddleware';
import { connectSentry } from 'Utils/sentry';
import app from 'Config/app';
import cache from 'Utils/cache';

connectSentry();

const originalHandler = async () => {
  cache().set('foo', 'bar', 10, (err, data) => {
    console.log(`Logger: err(${err}) data(${data})`);
  });

  cache().get('foo', (err, data) => {
    console.log(`Logger: err(${err}) data(${data})`);
  });

  cache().end();
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
