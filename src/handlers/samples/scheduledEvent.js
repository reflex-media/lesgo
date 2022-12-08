import logger from 'lesgo/utils/logger';
import { connectSentry } from 'lesgo/utils/sentry';
import ping from 'core/ping';

connectSentry();

// eslint-disable-next-line import/prefer-default-export
export const handler = event => {
  logger.info('Received Scheduled Event', { event });
  return ping();
};
