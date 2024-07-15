import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { sqsMiddleware } from 'lesgo/middlewares';
import { dispatch } from 'lesgo/utils/sqs';

type MiddyAPIGatewayProxyEvent = APIGatewayProxyEvent & {
  body: Record<any, any>;
};

const enqueueHandler = async (event: MiddyAPIGatewayProxyEvent) => {
  const { body } = event;

  const queued = await dispatch(body, 'defaultQueue');

  return {
    message: 'Dispatched to Queue successfully',
    ...queued,
  };
};

export const handler = middy().use(sqsMiddleware()).handler(enqueueHandler);

export default handler;
