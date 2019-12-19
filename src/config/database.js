/**
 * Lists of supported dialects in "knex" library
 * - sqlite
 * - postgres
 * - mssql
 * - mysql2
 * - oracle
 * - oracledb
 * - redshift
 */

import mysql from 'knex/lib/dialects/mysql';

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
   * All database work in Lesgo is done through the Knex and ObjectionJS Package facilities
   * so make sure you have the dialect for your particular database of
   * choice installed on your machine before you begin development.
   *
   * References:
   *      http://knexjs.org/#Installation-client
   */

  connections: {
    /**
     * using mysql2 will give you more access to their API
     * however, it is optional to use it due to we are using
     * lambda
     */
    mysql: {
      client: mysql,
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

    sqlite: {
      // client: sqlite3,
      connection: {
        filename: 'path/to/database.sqlite',
      },
    },

    postgres: {
      // client: postgres,
      version: '7.2',
      connection: {
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'myapp_test',
      },
    },
  },
};
