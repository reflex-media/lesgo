import { query } from 'lesgo/utils/dynamodb';
import { isEmpty, logger } from 'lesgo/utils';
import dynamodbConfig from '../../../config/dynamodb';
import ErrorException from '../../../exceptions/ErrorException';

const FILE = 'models.sample-dynamodb.Blog/getBlogsByUserIdTitle';

export default async (userId: string, title: string, returnFields?: string) => {
  const tableName = dynamodbConfig.tables.defaultTableName;

  logger.debug(`${FILE}::FETCHING_DATA`, {
    userId,
    title,
    returnFields,
    tableName,
  });

  let opts: {
    filterExpression: string;
    projectionExpression?: string;
    singletonConn?: string;
  } = {
    filterExpression: 'title = :t',
  };

  if (!isEmpty(returnFields)) {
    opts = {
      ...opts,
      projectionExpression: returnFields,
    };
  }

  const resp = await query(
    tableName,
    'userId = :u',
    { ':u': userId, ':t': title },
    opts
  );

  if (isEmpty(resp) || resp!.length < 1) {
    throw new ErrorException(
      'Unable to find record',
      `${FILE}::NO_RECORD_FOUND`,
      404,
      { title, userId }
    );
  }

  return resp;
};
