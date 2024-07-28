import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpMiddleware } from 'lesgo/middlewares';
import { validateFields } from 'lesgo/utils';
import { setCache } from 'lesgo/utils/cache/redis';

type MiddyAPIGatewayProxyEvent = APIGatewayProxyEvent & {
  body: {
    key: string;
    value: string | number | boolean;
  };
};

const setCacheHandler = async (event: MiddyAPIGatewayProxyEvent) => {
  const body = event.body;

  const input = validateFields(body, [
    { key: 'key', type: 'string', required: true },
    { key: 'value', type: 'any', required: true },
  ]);

  await setCache(input.key, input.value);

  return {
    message: 'Cache set successfully',
  };
};

export const handler = middy().use(httpMiddleware()).handler(setCacheHandler);

export default handler;
