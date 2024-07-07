import middy from '@middy/core';
import normalizeSQSMessageMiddleware, {
  SQSEventWithCollection,
} from 'lesgo/middlewares/normalizeSQSMessageMiddleware';
import insertBlog from 'models/sample/Blog/insertBlog';

type Data = {
  userId: string;
  blogId: string;
  title: string;
  snippet: string;
  content: string;
  isPublished: boolean;
  publishedAt: null;
  author: {
    name: string;
  };
};

type Event = {
  collection: { data: Data }[];
  data: Data;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const originalHandler = async (event: SQSEventWithCollection & Event) => {
  const { collection } = event;
  let { data } = event;

  if (Array.isArray(collection)) {
    data = collection[0].data;
  }

  const resp = await insertBlog(data);
  return {
    message: 'Blog created successfully',
    ...resp,
  };
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(normalizeSQSMessageMiddleware());
