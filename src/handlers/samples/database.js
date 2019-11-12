import middy from 'middy';
import httpMiddleware from 'lesgo/src/middlewares/httpMiddleware';
import { connectSentry } from 'Utils/sentry';
import { app } from 'Config';
import Model from 'Models/Model';

connectSentry();

const originalHandler = async () => {
  // eslint-disable-next-line no-console
  console.log(await Model.knex().raw('SELECT * FROM users'));

  await Model.knex().destroy();
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
