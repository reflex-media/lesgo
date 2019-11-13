/* eslint-disable no-console */
import middy from 'middy';
import httpMiddleware from 'lesgo/src/middlewares/httpMiddleware';
import { connectSentry } from 'Utils/sentry';
import app from 'Config/app';
import db from 'Utils/database';

connectSentry();

const originalHandler = async () => {
  await db()
    .query.raw('SELECT * FROM users')
    .then(items => {
      console.log(items);
    });

  await db().query.destroy();

  // Alternative way to execute a raw sql - you must import the Model above.
  //  - i.e: (import Model from 'Models/Model');
  //  - we suggests to use above sample when running sql, use the Model
  //      for ORM implementations, such as relations.
  //
  // console.log(await Model.knex().raw('SELECT * FROM users'));
  // await Model.knex().destroy();
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
