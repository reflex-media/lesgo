import middy from '@middy/core';
import { disconnectMiddleware, httpMiddleware } from 'lesgo/middlewares';
import { validateFields } from 'lesgo/utils';
import { deleteCache, disconnectCache } from 'lesgo/utils/cache/redis';

const deleteCacheHandler = async (event: DeleteCacheRequestEvent) => {
  const { queryStringParameters } = event;

  const input = validateFields(queryStringParameters, [
    { key: 'key', type: 'string', required: true },
  ]);

  await deleteCache(input.key);

  return {
    message: 'Cache deleted successfully',
  };
};

export const handler = middy()
  .use(httpMiddleware())
  .use(disconnectMiddleware({ clients: [disconnectCache] }))
  .handler(deleteCacheHandler);

export default handler;
