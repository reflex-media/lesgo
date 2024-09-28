import middy from '@middy/core';
import { disconnectMiddleware, httpMiddleware } from 'lesgo/middlewares';
import { disconnectDb } from 'lesgo/utils/db/mysql/proxy';
import { validateFields } from 'lesgo/utils';
import getAllMovies from '@models/sample-rdsMysqlProxy/Movie/getAllMovies';
import getMovieById from '@models/sample-rdsMysqlProxy/Movie/getMovieById';

const getRecordsHandler = async (event: GetMovieRequestEvent) => {
  const { queryStringParameters } = event;

  const input = validateFields({ ...queryStringParameters }, [
    { key: 'id', type: 'string', required: false },
    { key: 'title', type: 'string', required: false },
    { key: 'isDeleted', type: 'string', required: false },
  ]) as GetMovieRequestInput;

  if (input.id) {
    return getMovieById(Number(input.id));
  }

  // if (input.title) {
  //   return getBlogsByUserIdTitle(input.userId, input.title, input.returnFields);
  // }

  return getAllMovies();
};

export const handler = middy()
  .use(httpMiddleware())
  .use(disconnectMiddleware({ clients: [disconnectDb] }))
  .handler(getRecordsHandler);

export default handler;
