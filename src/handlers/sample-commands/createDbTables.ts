import middy from '@middy/core';
import { invokeCommandMiddleware } from 'lesgo/middlewares';
import { getObject } from 'lesgo/utils/s3';
import { logger, validateFields } from 'lesgo/utils';
import { query } from 'lesgo/utils/db/proxy';
import appConfig from '../../config/app';

const FILE = 'handlers.sample-commands.createDbTables';

type MiddyInvokeCommandEvent = string;

const createDbTablesHandler = async (event: MiddyInvokeCommandEvent) => {
  logger.debug(`${FILE}::RECEIVED_REQUEST`, { event });

  //   const { queryStringParameters } = event;

  //   const input = validateFields(queryStringParameters, [
  //     { key: 'key', type: 'string', required: true },
  //   ]);

  //   const sql = `
  //       CREATE TABLE IF NOT EXISTS movies (
  //       id INT AUTO_INCREMENT PRIMARY KEY,
  //       title VARCHAR(255) NOT NULL,
  //       synopsis TEXT NOT NULL,
  //       is_released BOOLEAN NOT NULL,
  //       released_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  //       director JSON NOT NULL
  //     ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;

  const sql = 'select * from information_schema.tables';

  const res = await query(sql);
  return res;
};

export const handler = middy()
  .use(
    invokeCommandMiddleware({
      debugMode: appConfig.debug,
    })
  )
  .handler(createDbTablesHandler);

export default handler;
