import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { LesgoException } from 'lesgo/exceptions';
import { disconnectMiddleware, httpMiddleware } from 'lesgo/middlewares';
import { isEmpty, validateFields } from 'lesgo/utils';
import { disconnectCache, getCache } from 'lesgo/utils/cache/redis';

const FILE = 'handlers.sample-elasticache-redis.getCache';

type MiddyAPIGatewayProxyEvent = APIGatewayProxyEvent & {
  queryStringParameters: {
    key: string;
  };
};

const getCacheHandler = async (event: MiddyAPIGatewayProxyEvent) => {
  const { queryStringParameters } = event;

  const input = validateFields(queryStringParameters, [
    { key: 'key', type: 'string', required: true },
  ]);

  const resp = await getCache(input.key);

  if (isEmpty(resp)) {
    throw new LesgoException(
      'Cache key not found',
      `${FILE}::CACHE_KEY_NOT_FOUND`,
      404,
      { input }
    );
  }

  return resp;
};

export const handler = middy()
  .use(httpMiddleware())
  .use(disconnectMiddleware({ clients: [disconnectCache] }))
  .handler(getCacheHandler);

export default handler;
