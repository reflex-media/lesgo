import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpMiddleware } from 'lesgo/middlewares';
import { validateFields } from 'lesgo/utils';
import { getSecretValue } from 'lesgo/utils/secretsmanager';

const getSecretValueHandler = async (event: APIGatewayProxyEvent) => {
  const { queryStringParameters } = event;

  const input = validateFields({ ...queryStringParameters! }, [
    { key: 'secretValue', type: 'string', required: true },
  ]);

  const resp = await getSecretValue(input.text);
  return resp;
};

export const handler = middy()
  .use(httpMiddleware())
  .handler(getSecretValueHandler);

export default handler;
