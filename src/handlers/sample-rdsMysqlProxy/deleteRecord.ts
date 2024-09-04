import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { disconnectMiddleware, httpMiddleware } from 'lesgo/middlewares';
import { disconnectDb } from 'lesgo/utils/db/mysql/proxy';
import { validateFields } from 'lesgo/utils';
import deleteMovieById from '../../models/sample-rdsMysqlProxy/Movie/deleteMovieById';

interface DeleteRecordInput {
  id: string;
}

interface MiddyAPIGatewayProxyEvent extends APIGatewayProxyEvent {
  queryStringParamters: DeleteRecordInput;
}

const deleteRecordHandler = async (event: MiddyAPIGatewayProxyEvent) => {
  const { queryStringParameters } = event;

  const input = validateFields({ ...queryStringParameters }, [
    { key: 'id', type: 'string', required: true },
  ]) as DeleteRecordInput;

  const resp = await deleteMovieById(Number(input.id));
  return {
    message: 'Movie deleted successfully',
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
  .handler(deleteRecordHandler);

export default handler;
