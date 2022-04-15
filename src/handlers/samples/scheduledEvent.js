import logger from 'Lesgo/Utils/logger';
import { connectSentry } from 'Lesgo/Utils/sentry';
import ping from 'Core/ping';

connectSentry();

// eslint-disable-next-line import/prefer-default-export
export const handler = event => {
  logger.info('Received Scheduled Event', { event });
  return ping();
};
