import { logger } from 'lesgo/utils';

import { connectSentry } from 'Utils/sentry';
import ping from 'Core/ping';

connectSentry();

// eslint-disable-next-line import/prefer-default-export
export const handler = event => {
  logger.info('received pingScheduled Event', { event });
  return ping();
};
