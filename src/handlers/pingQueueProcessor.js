import middy from 'middy';
import { normalizeSQSMessage } from '@reflex-media/lesgo/middlewares';

import { connectSentry } from 'Utils/sentry';
import pingQueueProcessor from 'Core/pingQueueProcessor';

connectSentry();

const originalHandler = event => {
  pingQueueProcessor(event.collection);
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(normalizeSQSMessage());
