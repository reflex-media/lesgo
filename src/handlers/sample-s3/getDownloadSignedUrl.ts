import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpMiddleware } from 'lesgo/middlewares';
import { getDownloadSignedUrl, getHeadObject } from 'lesgo/utils/s3';
import { validateFields } from 'lesgo/utils';

type MiddyAPIGatewayProxyEvent = APIGatewayProxyEvent & {
  queryStringParameters: {
    key: string;
  };
};

const getDownloadSignedUrlHandler = async (
  event: MiddyAPIGatewayProxyEvent
) => {
  const { queryStringParameters } = event;

  const input = validateFields(queryStringParameters, [
    { key: 'key', type: 'string', required: true },
  ]);

  const signedUrl = await getDownloadSignedUrl(input.key);
  const objectHead = await getHeadObject(input.key);

  return {
    url: signedUrl,
    ...objectHead,
  };
};

export const handler = middy()
  .use(httpMiddleware())
  .handler(getDownloadSignedUrlHandler);

export default handler;
