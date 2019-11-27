import logger from 'Utils/logger';
import { connectSentry } from 'Utils/sentry';
import ping from 'Core/ping';

connectSentry();

// eslint-disable-next-line import/prefer-default-export
export const handler = event => {
  logger.info('Received Scheduled Event', { event });
  return ping();
};
