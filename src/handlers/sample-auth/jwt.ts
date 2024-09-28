import middy from '@middy/core';
import { httpMiddleware, verifyJwtMiddleware } from 'lesgo/middlewares';
import { logger } from 'lesgo/utils';
import ping from '@core/utils/ping';

const FILE = 'handlers.sample-auth.jwt';

const pingHandler = (event: JwtRequestEvent) => {
  logger.debug(`${FILE}::RECEIVED_REQUEST`, event);

  const res = ping({ ...event.queryStringParameters });
  logger.debug(`${FILE}::RESPONSE_SENT`, res);

  return {
    ...res,
    jwt: event.jwt,
  };
};

export const handler = middy()
  .use(httpMiddleware())
  .use(verifyJwtMiddleware())
  .handler(pingHandler);

export default handler;
