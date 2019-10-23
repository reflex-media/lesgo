import middy from 'middy';
import { normalizeSQSMessage } from 'lesgo/middlewares';

import { connectSentry } from 'Factories/sentry';
import pingQueueProcessor from 'Core/pingQueueProcessor';

connectSentry();

const originalHandler = event => {
  pingQueueProcessor(event.collection);
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(normalizeSQSMessage());
