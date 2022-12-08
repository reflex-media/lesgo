/* eslint-disable no-console */
import middy from '@middy/core';
import httpMiddleware from 'Middlewares/httpMiddleware';
import app from 'Config/app';
import { connectSentry } from 'Utils/sentry';
import { db, dbRead, connectDb } from 'Utils/database';

connectDb();
connectSentry();

const originalHandler = async () => {
  // Fetch data from READ HOST
  const dataRead = await dbRead.query('SELECT * FROM users LIMIT 1');
  await dbRead.end();

  // Fetch data from WRITE HOST
  const dataWrite = await db.query('SELECT * FROM users LIMIT 1');
  await db.end();

  return [{ dataRead, dataWrite }];
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
