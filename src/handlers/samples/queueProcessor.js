import middy from 'middy';
import normalizeSQSMessageMiddleware from 'Middlewares/normalizeSQSMessageMiddleware';
import { connectSentry } from 'Utils/sentry';
import ErrorException from 'Exceptions/ErrorException';
import {
  PING_QUEUE_PROCESSOR_SAMPLE_ERROR,
  ERROR_EMPTY_PARAMETER,
} from 'Constants/errorCodes';

connectSentry();

const originalHandler = async event => {
  const { collection } = event;

  if (collection[0].data === undefined || collection[0].data === null) {
    throw new ErrorException(
      'Sample processed queue is empty',
      ERROR_EMPTY_PARAMETER,
      400
    );
  }

  const response = await Promise.all(
    collection.map(async record => {
      if (record.data['failed-queue'] === undefined) {
        return record;
      }

      throw new ErrorException(
        'Sample processed queue error',
        PING_QUEUE_PROCESSOR_SAMPLE_ERROR,
        400
      );
    })
  );

  return response;
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(normalizeSQSMessageMiddleware());
