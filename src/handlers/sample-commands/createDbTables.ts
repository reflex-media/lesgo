import middy from '@middy/core';
import { LesgoException } from 'lesgo/exceptions';
import { invokeCommandMiddleware } from 'lesgo/middlewares';
import { logger, validateFields } from 'lesgo/utils';
import { query } from 'lesgo/utils/db/mysql/proxy';
import appConfig from '../../config/app';

const FILE = 'handlers.sample-commands.createDbTables';

interface MiddyInvokeCommandEvent {
  dropTableIfExists?: boolean;
}

const createDbTablesHandler = async (event: MiddyInvokeCommandEvent) => {
  logger.debug(`${FILE}::RECEIVED_REQUEST`, { event });

  const input = validateFields(event, [
    { key: 'dropTableIfExists', type: 'boolean', required: false },
  ]);

  if (input.dropTableIfExists) {
    const dropSQL = 'DROP TABLE IF EXISTS movies';
    await query(dropSQL);
    logger.debug(`${FILE}::TABLES_DROPPED`);
  }

  const sql = `
    CREATE TABLE IF NOT EXISTS movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    synopsis TEXT NOT NULL,
    is_released BOOLEAN NOT NULL DEFAULT 0,
    released_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    director JSON NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN NOT NULL DEFAULT 0,
    deleted_at TIMESTAMP DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;

  try {
    const res = await query(sql);
    return res;
  } catch (error) {
    logger.error(`${FILE}::ERROR_CREATING_TABLES`, { error, sql });
    throw new LesgoException(
      'Error creating tables',
      `${FILE}::ERROR_CREATING_TABLES`,
      500,
      { error, sql }
    );
  }
};

export const handler = middy()
  .use(
    invokeCommandMiddleware({
      debugMode: appConfig.debug,
    })
  )
  .handler(createDbTablesHandler);

export default handler;
