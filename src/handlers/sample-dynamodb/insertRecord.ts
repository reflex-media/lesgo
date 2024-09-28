import middy from '@middy/core';
import { httpMiddleware } from 'lesgo/middlewares';
import { generateUid, validateFields } from 'lesgo/utils';
import insertBlog from '@models/sample-dynamodb/Blog/insertBlog';

const insertRecordHandler = async (event: CreateBlogRequestEvent) => {
  const { body } = event;
  const blogId = generateUid();

  const input = validateFields(body, [
    { key: 'userId', type: 'string', required: true },
    { key: 'title', type: 'string', required: true },
    { key: 'snippet', type: 'string', required: true },
    { key: 'content', type: 'string', required: true },
    { key: 'isPublished', type: 'boolean', required: true },
    { key: 'publishedAt', type: 'number', required: true },
    { key: 'author', type: 'object', required: true },
  ]) as CreateBlogRequestInput;

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
  .use(httpMiddleware())
  .handler(insertRecordHandler);

export default handler;
