import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpMiddleware } from 'lesgo/middlewares';
import { getUploadSignedUrl } from 'lesgo/utils/s3';
import { validateFields } from 'lesgo/utils';

type MiddyAPIGatewayProxyEvent = APIGatewayProxyEvent & {
  queryStringParameters: {
    key: string;
    expiresIn?: string;
    metadata?: string;
  };
};

const getUploadSignedUrlHandler = async (event: MiddyAPIGatewayProxyEvent) => {
  const { queryStringParameters } = event;

  const input = validateFields(queryStringParameters, [
    { key: 'key', type: 'string', required: true },
    { key: 'metadata', type: 'string', required: false },
    { key: 'expiresIn', type: 'string', required: false },
  ]);

  const metadata = input.metadata ? JSON.parse(input.metadata) : undefined;

  const uploadUrl = await getUploadSignedUrl(
    input.key,
    { Metadata: metadata },
    { expiresIn: input.expiresIn }
  );

  return {
    key: input.key,
    uploadUrl,
  };
};

export const handler = middy()
  .use(httpMiddleware())
  .handler(getUploadSignedUrlHandler);

export default handler;
