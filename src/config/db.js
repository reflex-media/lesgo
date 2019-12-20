export default {
  /*
   *--------------------------------------------------------------------------
   * Default Database Connection Name
   *--------------------------------------------------------------------------
   *
   * Here you may specify which of the database connections below you wish
   * to use as your default connection for all database work.
   */

  default: process.env.DB_CONNECTION || 'mysql',

  /*
   *--------------------------------------------------------------------------
   * Database Connections
   *--------------------------------------------------------------------------
   *
   * Here are each of the database connections setup for your application.
   * Of course, examples of configuring each database platform that is
   * supported by Lesgo is shown below to make development simple.
   */

  connections: {
    mysql: {
      connection: {
        host: process.env.DB_HOST_WRITE || process.env.DB_HOST || '127.0.0.1',
        host_read:
          process.env.DB_HOST_READ || process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'myapp_test',
        charset: 'utf8',
      },
    },
  },
};
