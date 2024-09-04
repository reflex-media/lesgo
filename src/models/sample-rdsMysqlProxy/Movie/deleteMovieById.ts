import { LesgoException } from 'lesgo/exceptions';
import { logger } from 'lesgo/utils';
import { query } from 'lesgo/utils/db/mysql/proxy';

const FILE = 'models.sample-rdsMysqlProxy.Movie/deleteMovieById';

export default async (id: number) => {
  const tableName = 'movies';

  const sql = `DELETE FROM ${tableName} WHERE id = ?`;
  logger.debug(`${FILE}::DELETE`, { sql, tableName });

  let resp;
  try {
    resp = await query(sql, [id]);
    logger.debug(`${FILE}::RECORD_DELETED`, { resp });
  } catch (error) {
    logger.error(`${FILE}::ERROR_ON_DELETE`, { error });
    throw new LesgoException(
      'Error deleting record',
      `${FILE}::ERROR_ON_DELETE`,
      500,
      { sql, tableName, error }
    );
  }

  return resp;
};
