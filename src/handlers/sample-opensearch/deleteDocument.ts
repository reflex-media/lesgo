import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import httpMiddleware from 'lesgo/middlewares/httpMiddleware';
import { deleteDocument } from 'lesgo/utils/opensearch';
import app from 'config/app';

const originalHandler = async (
  event: APIGatewayProxyEvent & {
    pathParameters: { documentId: string | number };
  }
) => {
  const { documentId } = event.pathParameters;

  const resp = await deleteDocument(documentId);
  return resp;
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
