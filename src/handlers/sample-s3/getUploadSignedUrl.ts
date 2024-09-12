import middy from '@middy/core';
import { httpMiddleware } from 'lesgo/middlewares';
import { getUploadSignedUrl } from 'lesgo/utils/s3';
import { validateFields } from 'lesgo/utils';

const getUploadSignedUrlHandler = async (
  event: GetUploadSignedUrlRequestEvent
) => {
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
