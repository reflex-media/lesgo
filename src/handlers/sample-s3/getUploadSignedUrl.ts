import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import httpMiddleware from 'lesgo/middlewares/httpMiddleware';
import { getUploadSignedUrl } from 'lesgo/utils/s3';
import app from 'config/app';
import s3Config from 'config/s3';

type Arguments = {
  objectKey: string;
  metadata?: string;
};

const originalHandler = async (
  event: APIGatewayProxyEvent & {
    input: Arguments;
  }
) => {
  const { input } = event;

  const signedUrl = await getUploadSignedUrl(
    `${s3Config.lesgoLiteBucket.path}/${input.objectKey}`,
    s3Config.lesgoLiteBucket.bucket,
    { metadata: input.metadata ? JSON.parse(input.metadata) : undefined }
  );

  return {
    objectKey: input.objectKey,
    objectUrl: `${s3Config.lesgoLiteBucket.uri}/${s3Config.lesgoLiteBucket.path}/${input.objectKey}`,
    signedUrl,
  };
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
