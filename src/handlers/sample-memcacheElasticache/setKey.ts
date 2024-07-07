import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import httpMiddleware from 'lesgo/middlewares/httpMiddleware';
import { setKey } from 'lesgo/utils/cache';
import app from 'config/app';

type Arguments = {
  key: string;
  value: string | object | string[] | object[];
  ttl?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const originalHandler = async (
  event: APIGatewayProxyEvent & { input: Arguments }
) => {
  const { input } = event;

  if (typeof input.ttl !== 'undefined') {
    await setKey(input.key, input.value, { ttl: parseInt(input.ttl, 10) });
    return {
      message: 'Cache set successfully with ttl',
    };
  }

  await setKey(input.key, input.value);
  return {
    message: 'Cache set successfully',
  };
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
