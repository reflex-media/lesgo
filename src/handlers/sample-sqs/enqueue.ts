import middy from '@middy/core';
import { httpMiddleware } from 'lesgo/middlewares';
import { dispatch } from 'lesgo/utils/sqs';

const enqueueHandler = async (event: CreateBlogRequestEvent) => {
  const { body } = event;

  const queued = await dispatch(body, 'sqsEventQueue');

  return {
    message: 'Dispatched to Queue successfully',
    ...queued,
  };
};

export const handler = middy().use(httpMiddleware()).handler(enqueueHandler);

export default handler;
