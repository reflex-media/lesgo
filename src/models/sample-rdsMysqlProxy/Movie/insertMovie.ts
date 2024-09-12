import { LesgoException } from 'lesgo/exceptions';
import { logger, getCurrentTimestamp, formatUnixTimestamp } from 'lesgo/utils';
import { query } from 'lesgo/utils/db/mysql/proxy';

const FILE = 'models.sample-rdsMysqlProxy.Movie/insertMovie';

export default async (params: CreateMovieRequestInput) => {
  const tableName = 'movies';
  const dateTimeNow = formatUnixTimestamp(getCurrentTimestamp());

  const insertData = {
    ...params,
    isDeleted: false,
    createdAt: dateTimeNow,
    updatedAt: dateTimeNow,
    deletedAt: null,
  };

  const sql = `INSERT INTO ${tableName} (title, synopsis, is_released, released_at, director, is_deleted, created_at, updated_at, deleted_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  logger.debug(`${FILE}::INSERTING_RECORD`, { sql, insertData, tableName });

  try {
    const resp = await query(sql, [
      insertData.title,
      insertData.synopsis,
      insertData.isReleased,
      formatUnixTimestamp(insertData.releasedAt),
      JSON.stringify(insertData.director),
      insertData.isDeleted,
      insertData.createdAt,
      insertData.updatedAt,
      insertData.deletedAt,
    ]);

    logger.debug(`${FILE}::RECORD_INSERTED`, { resp });
    return resp;
  } catch (error) {
    logger.error(`${FILE}::ERROR_ON_INSERT`, { error });
    throw new LesgoException(
      'Error on inserting record',
      `${FILE}::ERROR_ON_INSERT`,
      500,
      { sql, insertData, tableName, error }
    );
  }
};
