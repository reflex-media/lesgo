import { LesgoException } from 'lesgo/exceptions';
import { logger } from 'lesgo/utils';
import { query } from 'lesgo/utils/db/mysql/proxy';

const FILE = 'models.sample-rdsMysqlProxy.Movie/getAllMovies';

export default async () => {
  const tableName = 'movies';

  const sql = `SELECT * FROM ${tableName} ORDER BY id DESC`;
  logger.debug(`${FILE}::SELECT_ALL_RECORDS`, { sql, tableName });

  try {
    const resp = await query(sql);
    logger.debug(`${FILE}::RECORDS_FETCHED`, { resp });
    return resp;
  } catch (error) {
    logger.error(`${FILE}::ERROR_ON_SELECT`, { error });
    throw new LesgoException(
      'Error selecting records',
      `${FILE}::ERROR_ON_SELECT`,
      500,
      { sql, tableName, error }
    );
  }
};
