import middy from '@middy/core';
import { disconnectMiddleware, httpMiddleware } from 'lesgo/middlewares';
import { disconnectDb } from 'lesgo/utils/db/mysql/proxy';
import { validateFields } from 'lesgo/utils';
import deleteMovieById from '@models/sample-rdsMysqlProxy/Movie/deleteMovieById';

const deleteRecordHandler = async (event: DeleteMovieRequestEvent) => {
  const { queryStringParameters } = event;

  const input = validateFields({ ...queryStringParameters }, [
    { key: 'id', type: 'string', required: true },
  ]) as DeleteMovieRequestInput;

  const resp = await deleteMovieById(Number(input.id));
  return {
    message: 'Movie deleted successfully',
    ...resp,
  };
};

export const handler = middy()
  .use(httpMiddleware())
  .use(
    disconnectMiddleware({
      clients: [disconnectDb],
    })
  )
  .handler(deleteRecordHandler);

export default handler;
