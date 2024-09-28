import middy from '@middy/core';
import { httpMiddleware } from 'lesgo/middlewares';
import { verify } from 'lesgo/utils/jwt';
import { isEmpty, validateFields } from 'lesgo/utils';
import ErrorException from '@exceptions/ErrorException';

const FILE = 'handlers.sample-jwt.verify';

const verifyJWTHandler = (event: JwtVerifyRequestEvent) => {
  const { queryStringParameters } = event;

  // TODO: Other than the token, note that the below is only to serve as a sample.
  // You should never allow the client to dictate the options of the JWT.
  const input = validateFields(queryStringParameters, [
    { key: 'token', type: 'string', required: true },
    { key: 'validateClaims', type: 'string', required: false },
    { key: 'issuer', type: 'string', required: false },
    { key: 'audience', type: 'string', required: false },
  ]);

  if (!isEmpty(input.validateClaims)) {
    input.validateClaims = input.validateClaims !== 'false';
  }

  try {
    const payload = verify(input.token, undefined, input);

    return payload;
  } catch (error: any) {
    throw new ErrorException(
      'Error verifying JWT',
      `${FILE}::ERROR_VERIFYING_JWT`,
      401,
      error
    );
  }
};

export const handler = middy().use(httpMiddleware()).handler(verifyJWTHandler);

export default handler;
