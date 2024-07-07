import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import httpMiddleware from 'lesgo/middlewares/httpMiddleware';
import app from 'config/app';
import updateBlog from 'models/sample/Blog/updateBlog';

type Arguments = {
  userId: string;
  content: string;
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

  const resp = await updateBlog({
    userId: input.userId,
    blogId: pathParameters.recordId,
    content: input.content,
  });
  return {
    message: 'Blog updated successfully',
    ...resp,
  };
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
