import middy from '@middy/core';
import { httpMiddleware } from 'lesgo/middlewares';
import { getDownloadSignedUrl, getHeadObject } from 'lesgo/utils/s3';
import { validateFields } from 'lesgo/utils';

const getDownloadSignedUrlHandler = async (
  event: GetDownloadSignedUrlRequestEvent
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
