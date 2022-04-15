import middy from 'middy';
import normalizeSQSMessageMiddleware from 'Lesgo/Middlewares/normalizeSQSMessageMiddleware';
import { connectSentry } from 'Lesgo/Utils/sentry';
import ErrorException from 'Exceptions/ErrorException';
import { PING_QUEUE_PROCESSOR_SAMPLE_ERROR } from 'Constants/errorCodes';

connectSentry();

const originalHandler = event => {
  const { collection } = event;

  if (collection[0].data === undefined || collection[0].data === null)
    return collection;

  if (collection[0].data['failed-queue'] === undefined) return collection;

  throw new ErrorException(
    'Sample processed queue error',
    PING_QUEUE_PROCESSOR_SAMPLE_ERROR,
    400
  );
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(normalizeSQSMessageMiddleware());
