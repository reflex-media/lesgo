/* eslint-disable no-console */
import middy from 'middy';
import httpMiddleware from 'Lesgo/Middlewares/httpMiddleware';
import { connectSentry } from 'Lesgo/Utils/sentry';
import logger from 'Lesgo/Utils/logger';
import ErrorException from 'Exceptions/ErrorException';
import { ERROR_SAMPLE, ERROR_UNKNOWN_PARAMETER } from 'Constants/errorCodes';
import app from 'Config/app';

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
