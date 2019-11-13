import logger from 'lesgo/src/utils/logger';
import { connectSentry } from 'lesgo/src/utils/sentry';
import ping from 'Core/ping';

connectSentry();

// eslint-disable-next-line import/prefer-default-export
export const handler = event => {
  logger.info('received pingScheduled Event', { event });
  return ping();
};
