import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { disconnectMiddleware, httpMiddleware } from 'lesgo/middlewares';
import { validateFields } from 'lesgo/utils';
import { disconnectCache, setCache } from 'lesgo/utils/cache/redis';

type SetCacheBody = {
  key: string;
  value: string | number | boolean;
  expire?: number;
};

type MiddyAPIGatewayProxyEvent = APIGatewayProxyEvent & {
  body: SetCacheBody;
};

const setCacheHandler = async (event: MiddyAPIGatewayProxyEvent) => {
  const { body } = event;

  const input = validateFields(body, [
    { key: 'key', type: 'string', required: true },
    { key: 'value', type: 'any', required: true },
    { key: 'expire', type: 'number', required: false },
  ]) as SetCacheBody;

  await setCache(input.key, input.value, { EX: input.expire });

  return {
    message: 'Cache set successfully',
  };
};

export const handler = middy()
  .use(httpMiddleware())
  .use(disconnectMiddleware({ clients: [disconnectCache] }))
  .handler(setCacheHandler);

export default handler;
