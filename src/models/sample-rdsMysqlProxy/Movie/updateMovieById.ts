import { LesgoException } from 'lesgo/exceptions';
import { logger, getCurrentTimestamp, formatUnixTimestamp } from 'lesgo/utils';
import { query } from 'lesgo/utils/db/mysql/proxy';

const FILE = 'models.sample-rdsMysqlProxy.Movie/insertMovie';

export default async (id: number, params: UpdateMovieRequestInput) => {
  const tableName = 'movies';
  const dateTimeNow = formatUnixTimestamp(getCurrentTimestamp());

  const updateData = {
    ...params,
    updated_at: dateTimeNow,
  };

  const sqlSet: string[] = [];
  const preparedValues = [];
  Object.keys(params).forEach(key => {
    if (typeof params[key] !== 'undefined') {
      if (key === 'isReleased') {
        sqlSet.push(`is_released = ?`);
        preparedValues.push(params[key]);
      } else if (key === 'releasedAt') {
        sqlSet.push(`released_at = ?`);
        preparedValues.push(params[key]);
      } else if (key === 'director') {
        sqlSet.push(`director = ?`);
        preparedValues.push(JSON.stringify(params[key]));
      } else {
        sqlSet.push(`${key} = ?`);
        preparedValues.push(params[key]);
      }
    }
  });
  preparedValues.push(id);

  const sql = `UPDATE ${tableName} SET ${sqlSet.join(',')} WHERE id = ?`;
  logger.debug(`${FILE}::UPDATING_RECORD`, {
    sql,
    updateData,
    preparedValues,
    tableName,
  });

  try {
    const resp = await query(sql, preparedValues);

    logger.debug(`${FILE}::RECORD_INSERTED`, { resp });
    return resp;
  } catch (error) {
    logger.error(`${FILE}::ERROR_ON_INSERT`, { error });
    throw new LesgoException(
      'Error on inserting record',
      `${FILE}::ERROR_ON_INSERT`,
      500,
      { sql, updateData, preparedValues, tableName, error }
    );
  }
};
