import { APIGatewayProxyEvent } from 'aws-lambda';

declare global {
  type PingRequestInput = {
    'sample-error'?: string;
  };

  type PingRequestEvent = APIGatewayProxyEvent & {
    queryStringParameters: PingRequestInput;
  };
}

export {};
