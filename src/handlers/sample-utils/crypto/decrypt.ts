import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpMiddleware } from 'lesgo/middlewares';
import { decrypt } from 'lesgo/utils/crypto';
import { validateFields } from 'lesgo/utils';

const decryptHandler = async (event: APIGatewayProxyEvent) => {
  const { queryStringParameters } = event;

  const input = validateFields({ ...queryStringParameters! }, [
    { key: 'encryptedText', type: 'string', required: true },
  ]);

  const resp = decrypt(input.encryptedText);
  return { decrypted: resp };
};

export const handler = middy().use(httpMiddleware()).handler(decryptHandler);

export default handler;
