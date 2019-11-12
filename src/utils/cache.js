import config from 'Config/cache';
import { ElastiCacheService } from 'lesgo';

const singleton = [];

const es = (conn = null) => {
  if (singleton[conn]) {
    return singleton[conn];
  }

  const { driver } = new ElastiCacheService({
    ...config.connections[conn || config.default],
  });

  singleton[conn] = driver;

  return driver;
};

export default es;
