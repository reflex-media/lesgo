import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpMiddleware } from 'lesgo/middlewares';
import { hash } from 'lesgo/utils/crypto';
import { validateFields } from 'lesgo/utils';
import appConfig from '../../../config/app';

type QueryStringParameters = {
  text?: string;
};

const validateInput = (input: QueryStringParameters) => {
  const validFields = [{ key: 'text', type: 'string', required: true }];

  const validated = validateFields(input, validFields);
  return validated;
};

const hasnHandler = async (event: APIGatewayProxyEvent) => {
  const { queryStringParameters } = event;

  const input = validateInput({ ...queryStringParameters! });

  const resp = hash(input.text);
  return { hashed: resp };
};

export const handler = middy()
  .use(httpMiddleware({ debugMode: appConfig.debug }))
  .handler(hasnHandler);

export default handler;
