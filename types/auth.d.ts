import { APIGatewayProxyEvent } from 'aws-lambda';

declare global {
  type BasicAuthRequestEvent = APIGatewayProxyEvent & {
    basicAuth: {
      username: string;
    };
  };

  type JwtRequestEvent = APIGatewayProxyEvent & {
    jwt: string | Jwt | JwtPayload;
  };

  type JwtVerifyRequestInput = {
    token: string;
    validateClaims?: string;
    issue?: string;
    audience?: string;
  };

  type JwtVerifyRequestEvent = APIGatewayProxyEvent & {
    queryStringParameters: JwtVerifyRequestInput;
  };

  type JwtSignRequestInput = {
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

  type JwtSignRequestEvent = APIGatewayProxyEvent & {
    body: JwtSignRequestInput;
  };
}

export {};
