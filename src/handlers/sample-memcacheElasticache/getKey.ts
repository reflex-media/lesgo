import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import httpMiddleware from 'lesgo/middlewares/httpMiddleware';
import { getKey } from 'lesgo/utils/cache';
import app from 'config/app';

type Arguments = {
  key: string;
  value: string | object | string[] | object[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const originalHandler = async (
  event: APIGatewayProxyEvent & { input: Arguments }
) => {
  const { input } = event;

  const resp = await getKey(input.key);
  if (resp === null) {
    return {
      message: 'Cache key not found',
    };
  }
  return {
    message: 'Cache key found',
    data: resp,
  };
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
