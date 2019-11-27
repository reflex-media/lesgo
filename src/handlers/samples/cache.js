/* eslint-disable no-console */
import middy from 'middy';
import httpMiddleware from 'Middlewares/httpMiddleware';
import { connectSentry } from 'Utils/sentry';
import app from 'Config/app';
import cache from 'Utils/cache';
import ErrorException from 'Exceptions/ErrorException';

connectSentry();

const originalHandler = async event => {
  const { input } = event;

  if (!input) return 'Pong';

  if (input.method === 'set') {
    let cacheKey = 'sampleCacheKey';
    let cacheValue = 'sampleCacheData';

    if (input.key) cacheKey = input.key;
    if (input.value) cacheValue = input.value;

    try {
      await cache.set(cacheKey, cacheValue, 600);
      return 'Cache Set';
    } catch (err) {
      throw new ErrorException(
        'Failed to set cache',
        'CACHE_SET_FAILURE',
        500,
        err
      );
    }
  }

  if (input.method === 'get') {
    let cacheKey = 'sampleCacheKey';

    if (input.key) cacheKey = input.key;

    try {
      const data = await cache.get(cacheKey);
      return data;
    } catch (err) {
      throw new ErrorException(
        'Failed to get cache',
        'CACHE_GET_FAILURE',
        500,
        err
      );
    }
  }

  if (input.method === 'del') {
    let cacheKey = 'sampleCacheKey';

    if (input.key) cacheKey = input.key;

    try {
      await cache.del(cacheKey);
      return 'Cache Deleted';
    } catch (err) {
      throw new ErrorException(
        'Failed to get cache',
        'CACHE_GET_FAILURE',
        500,
        err
      );
    }
  }

  return 'Pong';
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
