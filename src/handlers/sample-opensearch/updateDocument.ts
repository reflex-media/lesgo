import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import httpMiddleware from 'lesgo/middlewares/httpMiddleware';
import { indexDocument } from 'lesgo/utils/opensearch';
import app from 'config/app';

type Arguments = {
  uid?: string;
  name?: string;
  gender?: string;
  profile?: {
    aboutMe?: string;
    headline?: string;
  };
  location?: {
    formattedAddress?: string;
    city?: string;
    state?: string;
    country?: string;
    lat?: number;
    lng?: number;
  };
  favoriteMovies?: {
    title?: string;
    director?: string;
    genre?: string[];
  }[];
  createdAt?: number;
  updatedAt?: number;
};

const originalHandler = async (
  event: APIGatewayProxyEvent & {
    input: Arguments;
    pathParameters: { documentId: string };
  }
) => {
  const { documentId } = event.pathParameters;

  let { input } = event;

  if (typeof input.uid === 'undefined') {
    input = {
      ...input,
      uid: documentId,
    };
  }

  const resp = await indexDocument(documentId, input);
  return resp;
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
