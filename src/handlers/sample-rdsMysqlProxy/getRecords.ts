import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { disconnectMySQLProxyClient } from 'lesgo/services/RDSAuroraMySQLProxyService';
import { disconnectMiddleware, httpMiddleware } from 'lesgo/middlewares';
import { isEmpty, validateFields } from 'lesgo/utils';
import getAllMovies from '../../models/sample-rdsMysqlProxy/Movie/getAllMovies';
import getMovieById from '../../models/sample-rdsMysqlProxy/Movie/getMovieById';

interface GetRecordsInput {
  id?: string;
  title?: string;
  isDeleted?: string;
}

type MiddyAPIGatewayProxyEvent = APIGatewayProxyEvent & {
  queryStringParamters: GetRecordsInput;
};

const getRecordsHandler = async (event: MiddyAPIGatewayProxyEvent) => {
  const { queryStringParameters } = event;

  const input = validateFields(queryStringParameters!, [
    { key: 'id', type: 'string', required: false },
    { key: 'title', type: 'string', required: false },
    { key: 'isDeleted', type: 'string', required: false },
  ]) as GetRecordsInput;

  if (input.id) {
    return getMovieById(Number(input.id));
  }

  // if (input.title) {
  //   return getBlogsByUserIdTitle(input.userId, input.title, input.returnFields);
  // }

  return getAllMovies();
};

export const handler = middy()
  .use(
    disconnectMiddleware({
      clients: [disconnectMySQLProxyClient],
    })
  )
  .use(httpMiddleware())
  .handler(getRecordsHandler);

export default handler;
