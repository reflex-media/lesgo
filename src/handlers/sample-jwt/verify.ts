import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpMiddleware } from 'lesgo/middlewares';
import { verify } from 'lesgo/utils/jwt';
import { isEmpty, validateFields } from 'lesgo/utils';
import appConfig from '../../config/app';
import ErrorException from '../../exceptions/ErrorException';

const FILE = 'handlers.sample-jwt.verify';

type MiddyAPIGatewayProxyEvent = APIGatewayProxyEvent & {
  queryStringParameters: {
    token: string;
    validateClaims?: string;
    audience?: string;
    issuer?: string;
    keyid?: string;
  };
};

const verifyJWTHandler = async (event: MiddyAPIGatewayProxyEvent) => {
  const { queryStringParameters } = event;

  const input = validateFields(queryStringParameters, [
    { key: 'token', type: 'string', required: true },
    { key: 'validateClaims', type: 'string', required: false },
    { key: 'audience', type: 'string', required: false },
    { key: 'issuer', type: 'string', required: false },
    { key: 'keyid', type: 'string', required: false },
  ]);

  if (!isEmpty(input.validateClaims)) {
    input.validateClaims = input.validateClaims !== 'false';
  }

  let payload;

  try {
    payload = verify(input.token, { opts: input });
  } catch (error: any) {
    throw new ErrorException(
      'Error verifying JWT',
      `${FILE}::ERROR_VERIFYING_JWT`,
      401,
      error
    );
  }

  return payload;
};

export const handler = middy()
  .use(httpMiddleware({ debugMode: appConfig.debug }))
  .handler(verifyJWTHandler);

export default handler;
