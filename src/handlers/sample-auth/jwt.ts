import { APIGatewayProxyEvent } from 'aws-lambda';
import middy from '@middy/core';
import { httpMiddleware, verifyJwtMiddleware } from 'lesgo/middlewares';
import { logger } from 'lesgo/utils';
import ping from '../../core/utils/ping';
import appConfig from '../../config/app';

const FILE = 'handlers.sample-auth.jwt';

const pingHandler = (event: APIGatewayProxyEvent) => {
  logger.debug(`${FILE}::RECEIVED_REQUEST`, event);

  const res = ping(event.queryStringParameters!);
  logger.debug(`${FILE}::RESPONSE_SENT`, res);

  return res;
};

export const handler = middy()
  .use(httpMiddleware({ debugMode: appConfig.debug }))
  .use(verifyJwtMiddleware())
  .handler(pingHandler);

export default handler;
