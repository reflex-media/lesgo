import middy from '@middy/core';
import { disconnectMiddleware, httpMiddleware } from 'lesgo/middlewares';
import { disconnectDb } from 'lesgo/utils/db/mysql/proxy';
import { validateFields } from 'lesgo/utils';
import updateMovieById from '@models/sample-rdsMysqlProxy/Movie/updateMovieById';

const updateRecordHandler = async (event: UpdateMovieRequestEvent) => {
  const { body } = event;

  const input = validateFields(body, [
    { key: 'title', type: 'string', required: false },
    { key: 'synopsis', type: 'string', required: false },
    { key: 'isReleased', type: 'boolean', required: false },
    { key: 'releasedAt', type: 'number', required: false },
    { key: 'director', type: 'object', required: false },
  ]) as UpdateMovieRequestInput;

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
  .use(httpMiddleware())
  .use(disconnectMiddleware({ clients: [disconnectDb] }))
  .handler(updateRecordHandler);

export default handler;
