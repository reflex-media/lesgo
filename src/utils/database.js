import config from 'Config/database';
import { DatabaseService } from 'lesgo/services';

const connection = (conn = null) => {
  const { sequelize } = new DatabaseService({
    ...config.connections[conn || config.default],
    ...{
      define: {
        underscored: true,
        timestamps: false,
      },
    },
  });

  return sequelize;
};

export default connection;
