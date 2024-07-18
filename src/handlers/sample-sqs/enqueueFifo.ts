import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpMiddleware } from 'lesgo/middlewares';
import { dispatch } from 'lesgo/utils/sqs';

type MiddyAPIGatewayProxyEvent = APIGatewayProxyEvent & {
  body: Record<any, any>;
};

const enqueueFifoHandler = async (event: MiddyAPIGatewayProxyEvent) => {
  const { body } = event;

  const queued = await dispatch(body, 'httpEventQueue.fifo', {
    fifo: true, // Optional. Can be derived from the Queue name with .fifo suffix
    messageGroupId: 'insertBlogGroup',
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
