import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import httpMiddleware from 'lesgo/middlewares/httpMiddleware';
import app from 'config/app';
import { verify } from 'lesgo/utils/jwt';

type Arguments = {
  token: string;
};

const originalHandler = async (
  event: APIGatewayProxyEvent & { input: Arguments }
) => {
  return verify(event.input.token);
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
