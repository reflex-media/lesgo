export default {
  /*
   *--------------------------------------------------------------------------
   * Default Database Connection Name
   *--------------------------------------------------------------------------
   *
   * Here you may specify which of the database connections below you wish
   * to use as your default connection for all database work. Of course
   * you may use many connections at once using the Database library.
   *
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
   *
   *
   * All database work in Lesgo is done through the Sequalize Package facilities
   * so make sure you have the dialect for your particular database of
   * choice installed on your machine before you begin development.
   *
   */

  connections: {
    sqlite: {
      storage: 'path/to/database.sqlite',
      dialect: 'sqlite',
    },

    mysql: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'lesgo',
      dialect: 'mysql',
    },

    mariadb: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'lesgo',
      dialect: 'mariadb',
      module: 'mariadb',
    },

    postgres: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 5432,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'lesgo',
      dialect: 'postgres',
      module: 'postgres',
    },

    mssql: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 1443,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'lesgo',
      dialect: 'mssql',
      module: 'mssql',
    },
  },
};
