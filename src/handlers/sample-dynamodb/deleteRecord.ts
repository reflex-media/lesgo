import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpMiddleware } from 'lesgo/middlewares';
import { validateFields } from 'lesgo/utils';
import deleteBlog from '../../models/sample-dynamodb/Blog/deleteBlog';

interface DeleteRecordInput {
  userId: string;
  blogId: string;
}

type MiddyAPIGatewayProxyEvent = APIGatewayProxyEvent & {
  queryStringParamters: DeleteRecordInput;
};

const deleteRecordHandler = async (event: MiddyAPIGatewayProxyEvent) => {
  const { queryStringParameters } = event;

  const input = validateFields(queryStringParameters!, [
    { key: 'userId', type: 'string', required: true },
    { key: 'blogId', type: 'string', required: true },
  ]) as DeleteRecordInput;

  const resp = await deleteBlog(input);
  return {
    message: 'Blog deleted successfully',
    ...resp,
  };
};

export const handler = middy()
  .use(httpMiddleware())
  .handler(deleteRecordHandler);

export default handler;
