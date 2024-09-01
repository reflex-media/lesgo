import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { disconnectMiddleware, httpMiddleware } from 'lesgo/middlewares';
import { disconnectDb } from 'lesgo/utils/db/mysql/proxy';
import { validateFields } from 'lesgo/utils';
import updateMovieById, {
  UpdateMovieModelInput,
} from '../../models/sample-rdsMysqlProxy/Movie/updateMovieById';

interface UpdateRecordInput {
  title: string;
  synopsis: string;
  isReleased: boolean;
  releasedAt: number;
  director: {
    name: string;
  };
}

type MiddyAPIGatewayProxyEvent = APIGatewayProxyEvent & {
  body: UpdateRecordInput;
  queryStringParameters: {
    id: string;
  };
};

const updateRecordHandler = async (event: MiddyAPIGatewayProxyEvent) => {
  const { body } = event;

  const input = validateFields(body, [
    { key: 'title', type: 'string', required: false },
    { key: 'synopsis', type: 'string', required: false },
    { key: 'isReleased', type: 'boolean', required: false },
    { key: 'releasedAt', type: 'number', required: false },
    { key: 'director', type: 'object', required: false },
  ]) as UpdateMovieModelInput;

  const { id } = validateFields(event.queryStringParameters, [
    { key: 'id', type: 'string', required: true },
  ]);

  const resp = await updateMovieById(Number(id), input);
  return {
    message: 'Movie updated successfully',
    ...resp,
  };
};

export const handler = middy()
  .use(
    disconnectMiddleware({
      clients: [disconnectDb],
    })
  )
  .use(httpMiddleware())
  .handler(updateRecordHandler);

export default handler;
