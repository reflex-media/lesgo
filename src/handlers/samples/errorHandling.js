/* eslint-disable no-console */
import middy from 'middy';
import httpMiddleware from 'lesgo/middlewares/httpMiddleware';
import { connectSentry } from 'lesgo/utils/sentry';
import logger from 'lesgo/utils/logger';
import ErrorException from 'exceptions/ErrorException';
import { ERROR_SAMPLE, ERROR_UNKNOWN_PARAMETER } from 'constants/errorCodes';
import app from 'config/app';

connectSentry();

const originalHandler = event => {
  const { input } = event;

  return new Promise((resolve, reject) => {
    if (!input) return resolve('Pong');

    if (input.type === 'message') {
      // eslint-disable-next-line prefer-promise-reject-errors
      return reject('Error Message');
    }

    if (input.type === 'exception') {
      logger.error('Sample error exception', { code: ERROR_SAMPLE });
      return reject(new ErrorException('Error exception', ERROR_SAMPLE));
    }

    logger.warn('Unknown parameter supplied', { input });

    return reject(
      new ErrorException('Unknown parameter supplied', ERROR_UNKNOWN_PARAMETER)
    );
  });
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
