import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import httpMiddleware from 'lesgo/middlewares/httpMiddleware';
import app from 'config/app';
import getBlogsByUserId from 'models/sample/Blog/getBlogsByUserId';
import getBlogsContentByUserIdTitle from 'models/sample/Blog/getBlogsContentByUserIdTitle';
import getBlogsContent from 'models/sample/Blog/getBlogsContent';

type Arguments = {
  userId: string;
  title?: string;
  returnFields?: string;
};

const originalHandler = async (
  event: APIGatewayProxyEvent & {
    input: Arguments;
  }
) => {
  const { input } = event;

  if (input.title) {
    return getBlogsContentByUserIdTitle(
      input.title || '',
      input.userId,
      input.returnFields
    );
  }

  if (input.returnFields) {
    return getBlogsContent(input.userId, input.returnFields || 'title');
  }

  const resp = await getBlogsByUserId(input.userId);
  return resp;
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
