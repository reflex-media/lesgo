import middy from '@middy/core';
import { httpMiddleware } from 'lesgo/middlewares';
import { dispatch } from 'lesgo/utils/sqs';

const enqueueFifoHandler = async (event: CreateBlogRequestEvent) => {
  const { body } = event;

  const queued = await dispatch(body, 'httpEventQueue.fifo', {
    MessageGroupId: 'insertBlogGroup',
  });

  return {
    message: 'Dispatched to Queue successfully',
    ...queued,
  };
};

export const handler = middy()
  .use(httpMiddleware())
  .handler(enqueueFifoHandler);

export default handler;
