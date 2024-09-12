import { APIGatewayProxyEvent } from 'aws-lambda';

declare global {
  type Movie = {
    id: number;
    title: string;
    synopsis: string;
    is_released: boolean;
    released_at: string;
    director: {
      name: string;
    };
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: number | null;
  };

  type CreateMovieRequestInput = {
    title: string;
    synopsis: string;
    isReleased: boolean;
    releasedAt: number;
    director: {
      name: string;
    };
  };

  type CreateMovieRequestEvent = APIGatewayProxyEvent & {
    body: CreateMovieRequestInput;
  };

  type UpdateMovieRequestInput = {
    [key: string]: UpdateMovieModelInputKey;
    title?: string;
    synopsis?: string;
    isReleased?: boolean;
    releasedAt?: number;
    director?: {
      name?: string;
    };
  };

  type UpdateMovieRequestEvent = APIGatewayProxyEvent & {
    body: UpdateMovieRequestInput;
    queryStringParameters: {
      id: string;
    };
  };

  type GetMovieRequestInput = {
    id?: string;
    title?: string;
    isDeleted?: string;
  };

  type GetMovieRequestEvent = APIGatewayProxyEvent & {
    queryStringParameters: GetMovieRequestInput;
  };

  type DeleteMovieRequestInput = {
    id: string;
  };

  interface DeleteMovieRequestEvent extends APIGatewayProxyEvent {
    queryStringParameters: DeleteMovieRequestInput;
  }
}

export {};
