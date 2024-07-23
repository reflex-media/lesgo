import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpMiddleware, verifyBasicAuthMiddleware } from 'lesgo/middlewares';
import { logger } from 'lesgo/utils';
import ping from '../../core/utils/ping';

const FILE = 'handlers.sample-auth.basicAuth';

interface MiddyAPIGatewayProxyEvent extends APIGatewayProxyEvent {
  basicAuth: {
    username: string;
  };
}

const pingHandler = (event: MiddyAPIGatewayProxyEvent) => {
  logger.debug(`${FILE}::RECEIVED_REQUEST`, event);

  const res = ping(event.queryStringParameters!);
  logger.debug(`${FILE}::RESPONSE_SENT`, res);

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
