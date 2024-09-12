import { APIGatewayProxyEvent } from 'aws-lambda';

declare global {
  type GetUploadSignedUrlRequestInput = {
    key: string;
    expiresIn?: string;
    metadata?: string;
  };

  type GetUploadSignedUrlRequestEvent = APIGatewayProxyEvent & {
    queryStringParameters: GetUploadSignedUrlRequestInput;
  };

  type GetObjectRequestInput = {
    key: string;
  };

  type GetObjectRequestEvent = APIGatewayProxyEvent & {
    queryStringParameters: GetObjectRequestInput;
  };

  type GetDownloadSignedUrlRequestInput = {
    key: string;
  };

  type GetDownloadSignedUrlRequestEvent = APIGatewayProxyEvent & {
    queryStringParameters: GetDownloadSignedUrlRequestInput;
  };
}
