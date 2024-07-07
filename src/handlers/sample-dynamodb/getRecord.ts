import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import httpMiddleware from 'lesgo/middlewares/httpMiddleware';
import app from 'config/app';
import getBlog from 'models/sample/Blog/getBlog';

type Arguments = {
  userId: string;
};

type PathParameters = {
  recordId: string;
};

const originalHandler = async (
  event: APIGatewayProxyEvent & {
    input: Arguments;
    pathParameters: PathParameters;
  }
) => {
  const { input, pathParameters } = event;

  const resp = await getBlog(pathParameters.recordId, input.userId);
  return resp;
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
