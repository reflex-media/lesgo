import { LesgoException } from 'lesgo/exceptions';
import { logger } from 'lesgo/utils';
import { query } from 'lesgo/utils/db/mysql/proxy';

const FILE = 'models.sample-rdsMysqlProxy.Movie/getMovieById';

export default async (id: number) => {
  const tableName = 'movies';

  const sql = `SELECT * FROM ${tableName} WHERE id = ?`;
  logger.debug(`${FILE}::SELECT`, { sql, tableName });

  let resp;
  try {
    resp = (await query(sql, [id])) as Movie[] | [];
    logger.debug(`${FILE}::RECORDS_FETCHED`, { resp });
  } catch (error) {
    logger.error(`${FILE}::ERROR_ON_SELECT`, { error });
    throw new LesgoException(
      'Error selecting records',
      `${FILE}::ERROR_ON_SELECT`,
      500,
      { sql, tableName, error }
    );
  }

  if (resp.length === 0) {
    throw new LesgoException(
      'No record found',
      `${FILE}::ERROR_NO_RECORD`,
      404,
      { id, sql, tableName }
    );
  }

  return resp[0];
};
