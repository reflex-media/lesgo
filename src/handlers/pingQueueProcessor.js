import middy from 'middy';
import normalizeSQSMessageMiddleware from 'lesgo/src/middlewares/normalizeSQSMessageMiddleware';
import { connectSentry } from 'lesgo/src/utils/sentry';
import pingQueueProcessor from 'Core/pingQueueProcessor';

connectSentry();

const originalHandler = event => {
  pingQueueProcessor(event.collection);
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(normalizeSQSMessageMiddleware());
