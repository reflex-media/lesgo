import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpMiddleware } from 'lesgo/middlewares';
import { encrypt } from 'lesgo/utils/crypto';
import { validateFields } from 'lesgo/utils';

const encryptHandler = async (event: APIGatewayProxyEvent) => {
  const { queryStringParameters } = event;

  const input = validateFields({ ...queryStringParameters! }, [
    { key: 'text', type: 'string', required: true },
  ]);

  const resp = encrypt(input.text);
  return { encrypted: resp };
};

export const handler = middy().use(httpMiddleware()).handler(encryptHandler);

export default handler;
