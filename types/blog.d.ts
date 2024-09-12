import { APIGatewayProxyEvent, SQSRecord, SQSEvent } from 'aws-lambda';

declare global {
  type DeleteBlogRequestInput = {
    blogId: string;
    userId: string;
  };

  type DeleteBlogRequestEvent = APIGatewayProxyEvent & {
    queryStringParameters: DeleteBlogRequestInput;
  };

  type CreateBlogRequestInput = {
    blogId: string;
    userId: string;
    title: string;
    snippet: string;
    content: string;
    isPublished: boolean;
    publishedAt: number;
    author: {
      name: string;
    };
  };

  type UpdateBlogRequestInput = {
    blogId: string;
    userId: string;
    title?: string;
    snippet?: string;
    content?: string;
    isPublished?: boolean;
    publishedAt?: number;
    author?: {
      name?: string;
    };
  };

  type GetBlogsRequestInput = {
    userId: string;
    blogId?: string;
    title?: string;
    returnFields?: string;
  };

  type GetBlogsRequestEvent = APIGatewayProxyEvent & {
    queryStringParameters: GetBlogsRequestInput;
  };

  type CreateBlogRequestEvent = APIGatewayProxyEvent & {
    body: CreateBlogRequestInput;
  };

  type SearchBlogRequestInput = {
    title?: string;
    returnFields?: string;
  };

  type SearchBlogRequestEvent = APIGatewayProxyEvent & {
    queryStringParameters: SearchBlogRequestInput;
  };

  type CreateBlogSQSRecord = SQSRecord & {
    body: CreateBlogRequestInput;
  };

  type CreateBlogSQSEvent = SQSEvent & {
    Records: CreateBlogSQSRecord[];
  };
}

export {};
