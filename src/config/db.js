export default {
  /*
   *--------------------------------------------------------------------------
   * Default Database Connection Name
   *--------------------------------------------------------------------------
   *
   * Here you may specify which of the database connections below you wish
   * to use as your default connection for all database work. Possible values are:
   *
   * `dataApi` - for Aurora DB using data-api-client for connection
   * `rdsProxy` and `rdsProxyRead` - for Aurora DB Proxy using mysql2 for connection
   */

  default: process.env.DB_CONNECTION || 'dataApi',

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
    /**
     * For Aurora DB using data-api-client for connection
     */
    dataApi: {
      secretArn: process.env.DB_SECRET_ARN,
      secretCommandArn: process.env.DB_SECRET_COMMAND_ARN,
      resourceArn: process.env.DB_RESOURCE_ARN,
      database: process.env.DB_NAME || 'myapp_test',
    },

    /**
     * For Aurora DB Proxy using mysql2 for connection
     */
    rdsProxy: {
      host: process.env.DB_HOST_WRITE || process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'myapp_test',
      persists: true,
    },
    rdsProxyRead: {
      host: process.env.DB_HOST_READ || process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'myapp_test',
      persists: true,
    },

    /**
     * @deprecated Legacy credentials for Lesgo! < 0.7.0
     */
    secretArn: process.env.DB_SECRET_ARN,
    secretCommandArn: process.env.DB_SECRET_COMMAND_ARN,
    resourceArn: process.env.DB_RESOURCE_ARN,
    database: process.env.DB_NAME || 'myapp_test',
  },
};
