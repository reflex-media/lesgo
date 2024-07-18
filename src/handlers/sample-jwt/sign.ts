import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpMiddleware } from 'lesgo/middlewares';
import { sign } from 'lesgo/utils/jwt';
import { logger, validateFields } from 'lesgo/utils';

const FILE = 'handlers.sample-jwt.sign';

type MiddyAPIGatewayProxyEvent = APIGatewayProxyEvent & {
  body: {
    payload: string;
    options?: {
      algorithm?: string;
      expiresIn?: string;
      issuer?: string;
      audience?: string;
      subject?: string;
      keyid?: string;
    };
  };
};

const signJWTHandler = (event: MiddyAPIGatewayProxyEvent) => {
  const { payload, options } = event.body;

  const input = validateFields(options || {}, [
    {
      key: 'algorithm',
      type: 'string',
      required: false,
    },
    {
      key: 'expiresIn',
      type: 'string',
      required: false,
    },
    {
      key: 'issuer',
      type: 'string',
      required: false,
    },
    {
      key: 'audience',
      type: 'string',
      required: false,
    },
    {
      key: 'subject',
      type: 'string',
      required: false,
    },
    {
      key: 'keyid',
      type: 'string',
      required: false,
    },
  ]);

  const token = sign(payload, { opts: input });
  return { token };
};

export const handler = middy()
  .use(httpMiddleware())
  .handler(signJWTHandler);

export default handler;
