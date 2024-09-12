import { APIGatewayProxyEvent } from 'aws-lambda';

declare global {
  type DeleteCacheRequestEvent = APIGatewayProxyEvent & {
    queryStringParameters: {
      key: string;
    };
  };

  type GetCacheRequestEvent = APIGatewayProxyEvent & {
    queryStringParameters: {
      key: string;
    };
  };

  type SetCacheRequestInput = {
    key: string;
    value: string | number | boolean;
    expire?: number;
  };

  type SetCacheRequestEvent = APIGatewayProxyEvent & {
    body: SetCacheRequestInput;
  };
}

export {};
