import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import httpMiddleware from 'lesgo/middlewares/httpMiddleware';
import { getHeadObject, getObject } from 'lesgo/utils/s3';
import app from 'config/app';
import s3Config from 'config/s3';

type Arguments = {
  objectKey: string;
};

const originalHandler = async (
  event: APIGatewayProxyEvent & {
    input: Arguments;
  }
) => {
  const { input } = event;

  const object = await getObject(
    `${s3Config.lesgoLiteBucket.path}/${input.objectKey}`,
    s3Config.lesgoLiteBucket.bucket
  );

  const objectString = await object.Body?.transformToString();

  const headObject = await getHeadObject(
    `${s3Config.lesgoLiteBucket.path}/${input.objectKey}`,
    s3Config.lesgoLiteBucket.bucket
  );

  return { headObject, objectString };
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
