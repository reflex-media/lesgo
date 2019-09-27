import ErrorException from 'Exceptions/ErrorException';
import { ERROR_SAMPLE, ERROR_UNKNOWN_PARAMETER } from 'Constants/errorCodes';

import { logger } from '@reflex-media/lesgo/utils';

const ping = input => {
  return new Promise((resolve, reject) => {
    if (!input) return resolve('Pong');

    if (input['sample-error'] === 'message') {
      // eslint-disable-next-line prefer-promise-reject-errors
      return reject('Error Message');
    }

    if (input['sample-error'] === 'exception') {
      return reject(new ErrorException('Error exception', ERROR_SAMPLE));
    }

    logger.withMeta.warn('Unknown parameter supplied', { input });

    return reject(
      new ErrorException('Unknown parameter supplied', ERROR_UNKNOWN_PARAMETER)
    );
  });
};

export default ping;
