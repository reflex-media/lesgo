import middy from '@middy/core';
import { httpMiddleware, verifyBasicAuthMiddleware } from 'lesgo/middlewares';
import { logger } from 'lesgo/utils';
import ping from '@core/utils/ping';

const FILE = 'handlers.sample-auth.basicAuth';

const pingHandler = (event: BasicAuthRequestEvent) => {
  logger.debug(`${FILE}::RECEIVED_REQUEST`, event);

  const res = ping({ ...event.queryStringParameters });

  return {
    ...res,
    basicAuth: event.basicAuth,
  };
};

export const handler = middy()
  .use(httpMiddleware())
  .use(verifyBasicAuthMiddleware())
  .handler(pingHandler);

export default handler;
