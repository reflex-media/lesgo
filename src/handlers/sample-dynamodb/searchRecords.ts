import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpMiddleware } from 'lesgo/middlewares';
import { validateFields } from 'lesgo/utils';
import appConfig from '../../config/app';
import searchBlogsByTitle from '../../models/sample-dynamodb/Blog/searchBlogsByTitle';

interface SearchRecordsInput {
  title?: string;
  returnFields?: string;
}

type MiddyAPIGatewayProxyEvent = APIGatewayProxyEvent & {
  queryStringParamters: SearchRecordsInput;
};

const searchRecordsHandler = async (event: MiddyAPIGatewayProxyEvent) => {
  const { queryStringParameters } = event;

  const input = validateFields(queryStringParameters!, [
    { key: 'title', type: 'string', required: false },
    { key: 'returnFields', type: 'string', required: false },
  ]) as SearchRecordsInput;

  if (input.title) {
    return searchBlogsByTitle(input.title, input.returnFields);
  }
};

export const handler = middy()
  .use(httpMiddleware({ debugMode: appConfig.debug }))
  .handler(searchRecordsHandler);

export default handler;
