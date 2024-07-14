import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpMiddleware } from 'lesgo/middlewares';
import { dispatch } from 'lesgo/utils/sqs';
import { generateUid } from 'lesgo/utils';
import appConfig from '../../config/app';

type MiddyAPIGatewayProxyEvent = APIGatewayProxyEvent & {
  body: Record<any, any>;
};

const enqueueHandler = async (event: MiddyAPIGatewayProxyEvent) => {
  const { body } = event;
  const documentId = await generateUid();

  const queued = await dispatch(body, 'defaultQueue');

  return {
    message: 'Dispatched to Queue successfully',
    ...queued,
  };
};

export const handler = middy()
  .use(httpMiddleware({ debugMode: appConfig.debug }))
  .handler(enqueueHandler);

export default handler;
