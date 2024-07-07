import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import httpMiddleware from 'lesgo/middlewares/httpMiddleware';
import app from 'config/app';
import generateUid from 'lesgo/utils/generateUid';
import insertBlog from 'models/sample/Blog/insertBlog';
import { InsertRecordInput } from 'types/blogs';

const originalHandler = async (
  event: APIGatewayProxyEvent & { input: InsertRecordInput }
) => {
  const { input } = event;
  const documentId = await generateUid();

  const blogRecord = {
    userId: input.userId,
    blogId: documentId,
    title: input.title,
    snippet: input.snippet,
    content: input.content,
    isPublished: input.isPublished === 'true',
    publishedAt:
      typeof input.publishedAt === 'string'
        ? parseInt(input.publishedAt, 10)
        : null,
    author: {
      name: input.authorName,
    },
  };

  const resp = await insertBlog(blogRecord);
  return {
    message: 'Blog created successfully',
    ...resp,
  };
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
