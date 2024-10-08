import { APIGatewayProxyEvent } from 'aws-lambda';
import middy from '@middy/core';
import { httpMiddleware } from 'lesgo/middlewares';
import { logger } from 'lesgo/utils';
import ping from '../../core/utils/ping';
import appConfig from '../../config/app';

const FILE = 'handlers.utils.ping';

type MiddyAPIGatewayProxyEvent = APIGatewayProxyEvent & {
  queryStringParameters: {
    'sample-error'?: string;
  };
};

const pingHandler = (event: MiddyAPIGatewayProxyEvent) => {
  logger.debug(`${FILE}::RECEIVED_REQUEST`, event);

  return ping(event.queryStringParameters);
};

export const handler = middy()
  .use(httpMiddleware({ debugMode: appConfig.debug }))
  .handler(pingHandler);

export default handler;
