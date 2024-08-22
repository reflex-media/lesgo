import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { disconnectMySQLProxyClient } from 'lesgo/services/RDSAuroraMySQLProxyService';
import { disconnectMiddleware, httpMiddleware } from 'lesgo/middlewares';
import { validateFields } from 'lesgo/utils';
import deleteMovieById from '../../models/sample-rdsMysqlProxy/Movie/deleteMovieById';

interface DeleteRecordInput {
  id: string;
}

type MiddyAPIGatewayProxyEvent = APIGatewayProxyEvent & {
  queryStringParamters: DeleteRecordInput;
};

const deleteRecordHandler = async (event: MiddyAPIGatewayProxyEvent) => {
  const { queryStringParameters } = event;

  const input = validateFields(queryStringParameters!, [
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
      clients: [disconnectMySQLProxyClient],
    })
  )
  .use(httpMiddleware())
  .handler(deleteRecordHandler);

export default handler;
