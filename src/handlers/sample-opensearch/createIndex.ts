import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import httpMiddleware from 'lesgo/middlewares/httpMiddleware';
import { createIndex } from 'lesgo/utils/opensearch';
import app from 'config/app';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const originalHandler = async (event: APIGatewayProxyEvent) => {
  const resp = await createIndex();
  return resp;
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
