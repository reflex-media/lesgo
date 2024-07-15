import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpMiddleware } from 'lesgo/middlewares';
import { generateUid, validateFields } from 'lesgo/utils';
import insertBlog from '../../models/sample-dynamodb/Blog/insertBlog';
import appConfig from '../../config/app';

interface InsertRecordInput {
  userId: string;
  title: string;
  snippet: string;
  content: string;
  isPublished: boolean;
  publishedAt: number;
  author: {
    name: string;
  };
}

type MiddyAPIGatewayProxyEvent = APIGatewayProxyEvent & {
  body: InsertRecordInput;
};

const insertRecordHandler = async (event: MiddyAPIGatewayProxyEvent) => {
  const { body } = event;
  const blogId = await generateUid();

  const input = validateFields(body, [
    { key: 'userId', type: 'string', required: true },
    { key: 'title', type: 'string', required: true },
    { key: 'snippet', type: 'string', required: true },
    { key: 'content', type: 'string', required: true },
    { key: 'isPublished', type: 'boolean', required: true },
    { key: 'publishedAt', type: 'number', required: true },
    { key: 'author', type: 'object', required: true },
  ]) as InsertRecordInput;

  const insertData = {
    ...input,
    blogId,
    author: {
      name: input.author.name,
    },
  };

  const resp = await insertBlog(insertData);
  return {
    message: 'Blog inserted successfully',
    ...resp,
  };
};

export const handler = middy()
  .use(httpMiddleware({ debugMode: appConfig.debug }))
  .handler(insertRecordHandler);

export default handler;
