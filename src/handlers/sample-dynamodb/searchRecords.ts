import middy from '@middy/core';
import { httpMiddleware } from 'lesgo/middlewares';
import { validateFields } from 'lesgo/utils';
import searchBlogsByTitle from '@models/sample-dynamodb/Blog/searchBlogsByTitle';

const searchRecordsHandler = async (event: SearchBlogRequestEvent) => {
  const { queryStringParameters } = event;

  const input = validateFields({ ...queryStringParameters }, [
    { key: 'title', type: 'string', required: false },
    { key: 'returnFields', type: 'string', required: false },
  ]) as SearchBlogRequestInput;

  if (input.title) {
    return searchBlogsByTitle(input.title, input.returnFields);
  }
};

export const handler = middy()
  .use(httpMiddleware())
  .handler(searchRecordsHandler);

export default handler;
