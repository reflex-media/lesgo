import middy from '@middy/core';
import { disconnectMiddleware, httpMiddleware } from 'lesgo/middlewares';
import { disconnectDb } from 'lesgo/utils/db/mysql/proxy';
import { validateFields } from 'lesgo/utils';
import insertMovie from '../../models/sample-rdsMysqlProxy/Movie/insertMovie';

const insertRecordHandler = async (event: CreateMovieRequestEvent) => {
  const { body } = event;

  const input = validateFields(body, [
    { key: 'title', type: 'string', required: true },
    { key: 'synopsis', type: 'string', required: true },
    { key: 'isReleased', type: 'boolean', required: true },
    { key: 'releasedAt', type: 'number', required: true },
    { key: 'director', type: 'object', required: true },
  ]) as CreateMovieRequestInput;

  const resp = await insertMovie(input);
  return {
    message: 'Movie inserted successfully',
    ...resp,
  };
};

export const handler = middy()
  .use(httpMiddleware())
  .use(disconnectMiddleware({ clients: [disconnectDb] }))
  .handler(insertRecordHandler);

export default handler;
