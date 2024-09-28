import middy from '@middy/core';
import { httpMiddleware } from 'lesgo/middlewares';
import { validateFields } from 'lesgo/utils';
import deleteBlog from '@models/sample-dynamodb/Blog/deleteBlog';

const deleteRecordHandler = async (event: DeleteBlogRequestEvent) => {
  const { queryStringParameters } = event;

  const input = validateFields({ ...queryStringParameters }, [
    { key: 'userId', type: 'string', required: true },
    { key: 'blogId', type: 'string', required: true },
  ]) as DeleteBlogRequestInput;

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
