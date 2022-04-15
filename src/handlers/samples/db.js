/* eslint-disable no-console */
import middy from 'middy';
import httpMiddleware from 'Lesgo/Middlewares/httpMiddleware';
import { connectSentry } from 'Lesgo/Utils/sentry';
import { db, dbRead, connectDb } from 'Lesgo/Utils/db';
import app from 'Config/app';

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
