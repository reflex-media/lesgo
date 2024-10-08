import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpMiddleware } from 'lesgo/middlewares';
import { validateFields } from 'lesgo/utils';
import getBlogsByUserId from '../../models/sample-dynamodb/Blog/getBlogsByUserId';
import getBlogByUserIdBlogId from '../../models/sample-dynamodb/Blog/getBlogByUserIdBlogId';
import getBlogsByUserIdTitle from '../../models/sample-dynamodb/Blog/getBlogsByUserIdTitle';

interface GetRecordsInput {
  userId: string;
  blogId?: string;
  title?: string;
  returnFields?: string;
}

type MiddyAPIGatewayProxyEvent = APIGatewayProxyEvent & {
  queryStringParamters: GetRecordsInput;
};

const getRecordsHandler = async (event: MiddyAPIGatewayProxyEvent) => {
  const { queryStringParameters } = event;

  const input = validateFields({ ...queryStringParameters }, [
    { key: 'userId', type: 'string', required: true },
    { key: 'blogId', type: 'string', required: false },
    { key: 'title', type: 'string', required: false },
    { key: 'returnFields', type: 'string', required: false },
  ]) as GetRecordsInput;

  if (input.blogId) {
    return getBlogByUserIdBlogId(input.userId, input.blogId);
  }

  if (input.title) {
    return getBlogsByUserIdTitle(input.userId, input.title, input.returnFields);
  }

  return getBlogsByUserId(input.userId);
};

export const handler = middy().use(httpMiddleware()).handler(getRecordsHandler);

export default handler;
