import { APIGatewayProxyEvent } from 'aws-lambda';
import middy from '@middy/core';
import { httpMiddleware } from 'lesgo/middlewares';
import { logger } from 'lesgo/utils';

import ping from '../../core/utils/ping';
import appConfig from '../../config/app';

const FILE = 'handlers.utils.ping';

const pingHandler = (event: APIGatewayProxyEvent) => {
  logger.debug(`${FILE}::RECEIVED_REQUEST`, event);

  const res = ping(event.queryStringParameters!);
  logger.debug(`${FILE}::RESPONSE_SENT`, res);

  return res;
};

export const handler = middy()
  .use(httpMiddleware({ debugMode: appConfig.debug }))
  .handler(pingHandler);

export default handler;
