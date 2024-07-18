import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpMiddleware } from 'lesgo/middlewares';
import { hash } from 'lesgo/utils/crypto';
import { validateFields } from 'lesgo/utils';

const hashHandler = async (event: APIGatewayProxyEvent) => {
  const { queryStringParameters } = event;

  const input = validateFields({ ...queryStringParameters! }, [
    { key: 'text', type: 'string', required: true },
    { key: 'alg', type: 'string', required: false },
  ]);

  const resp = hash(input.text, { algorithm: input.alg });
  return { hashed: resp };
};

export const handler = middy().use(httpMiddleware()).handler(hashHandler);

export default handler;
