import { APIGatewayProxyEvent } from 'aws-lambda';
import middy from '@middy/core';
import { httpMiddleware, verifyBasicAuthMiddleware } from 'lesgo/middlewares';
import { logger } from 'lesgo/utils';
import ping from '../../core/utils/ping';
import appConfig from '../../config/app';

const FILE = 'handlers.sample-auth.basic';

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
  .use(httpMiddleware({ debugMode: appConfig.debug }))
  .use(verifyBasicAuthMiddleware())
  .handler(pingHandler);

export default handler;
