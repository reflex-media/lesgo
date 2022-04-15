/* eslint-disable no-console */
import middy from 'middy';
import httpMiddleware from 'Lesgo/Middlewares/httpMiddleware';
import { connectSentry } from 'Lesgo/Utils/sentry';
import es from 'Lesgo/Utils/elasticsearch';
import app from 'Config/app';

connectSentry();

const originalHandler = async () => {
  try {
    await es().createIndices({
      number_of_shards: 3,
      number_of_replicas: 2,
    });

    console.log('\x1b[33m%s\x1b[0m', '#### CREATED INDICES ####');
  } catch (err) {
    console.error(err);
  }

  es().indexOrCreateById({
    id: 1,
    name: 'John Doe',
    address: '13 Doe Street, Chicago, USA, (123-456)',
    age: 28,
  });

  console.log('\x1b[33m%s\x1b[0m', '#### ADDED/UPDATED INDEX RECORD ####');
  console.log('\x1b[33m%s\x1b[0m', '#### USING es().get() ####');
  console.log(await es().get(1));
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
