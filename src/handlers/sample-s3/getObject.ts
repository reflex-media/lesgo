import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpMiddleware } from 'lesgo/middlewares';
import { getObject } from 'lesgo/utils/s3';
import { validateFields } from 'lesgo/utils';
import appConfig from '../../config/app';

type MiddyAPIGatewayProxyEvent = APIGatewayProxyEvent & {
  queryStringParameters: {
    key: string;
  };
};

const getObjectHandler = async (event: MiddyAPIGatewayProxyEvent) => {
  const { queryStringParameters } = event;

  const input = validateFields(queryStringParameters, [
    { key: 'key', type: 'string', required: true },
  ]);

  const object = await getObject(input.key);
  return object.toString('base64');
};

export const handler = middy()
  .use(
    httpMiddleware({
      debugMode: appConfig.debug,
      headers: {
        'Content-Type': 'image/jpeg',
      },
      isBase64Encoded: true,
    })
  )
  .handler(getObjectHandler);

export default handler;
