import config from 'Config/database';
import DatabaseService from 'lesgo/src/services/DatabaseService';

const connection = (conn = null) => {
  return new DatabaseService({
    ...config.connections[conn || config.default],
  });
};

export default connection;
