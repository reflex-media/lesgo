import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpMiddleware } from 'lesgo/middlewares';
import { validateFields } from 'lesgo/utils';
import updateBlog from '@models/sample-dynamodb/Blog/updateBlog';

interface UpdateRecordInputBody {
  title?: string;
  snippet?: string;
  content?: string;
  isPublished?: boolean;
  publishedAt?: number;
  author?: {
    name?: string;
  };
}

interface UpdateRecordInputQueryStringParameters {
  userId: string;
  blogId: string;
}

interface UpdateRecordInput
  extends UpdateRecordInputBody,
    UpdateRecordInputQueryStringParameters {}

type MiddyAPIGatewayProxyEvent = APIGatewayProxyEvent & {
  body: UpdateRecordInputBody;
  queryStringParameters: UpdateRecordInputQueryStringParameters;
};

const updateRecordHandler = async (event: MiddyAPIGatewayProxyEvent) => {
  const { body, queryStringParameters } = event;

  const input = validateFields(
    { ...(body as UpdateRecordInputBody), ...queryStringParameters },
    [
      { key: 'userId', type: 'string', required: true },
      { key: 'blogId', type: 'string', required: true },
      { key: 'title', type: 'string', required: false },
      { key: 'snippet', type: 'string', required: false },
      { key: 'content', type: 'string', required: false },
      { key: 'isPublished', type: 'boolean', required: false },
      { key: 'publishedAt', type: 'number', required: false },
      { key: 'author', type: 'object', required: false },
    ]
  ) as UpdateRecordInput;

  const resp = await updateBlog(input);
  return {
    message: 'Blog updated successfully',
    ...resp,
  };
};

export const handler = middy()
  .use(httpMiddleware())
  .handler(updateRecordHandler);

export default handler;
