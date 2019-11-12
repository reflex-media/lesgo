import config from 'Config/database';
import { DatabaseService } from 'lesgo';

const singleton = [];

const connection = (conn = null) => {
  if (singleton[conn]) {
    return singleton[conn];
  }

  const instance = new DatabaseService({
    ...config.connections[conn || config.default],
  });

  singleton[conn] = instance;

  return instance;
};

export default connection;
