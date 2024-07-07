import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import httpMiddleware from 'lesgo/middlewares/httpMiddleware';
import app from 'config/app';
import dispatch from 'lesgo/utils/sqs/dispatch';
import generateUid from 'lesgo/utils/generateUid';

type Arguments = {
  userId: string;
  authorName: string;
  title: string;
  snippet: string;
  content: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const originalHandler = async (
  event: APIGatewayProxyEvent & { input: Arguments }
) => {
  const { input } = event;
  const documentId = await generateUid();

  const blogRecord = {
    userId: input.userId,
    blogId: documentId,
    title: input.title,
    snippet: input.snippet,
    content: input.content,
    isPublished: false,
    publishedAt: null,
    author: {
      name: input.authorName,
    },
  };
  const queued = await dispatch({ data: blogRecord }, 'lesgoQueue');

  return {
    message: 'Dispatched to Queue successfully',
    ...queued,
  };
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
