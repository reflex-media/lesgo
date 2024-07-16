import { query } from 'lesgo/utils/dynamodb';
import { logger } from 'lesgo/utils';
import dynamodbConfig from '../../../config/dynamodb';

const FILE = 'models.sample-dynamodb.Blog.getBlogsByUserId';

export default async (userId: string) => {
  const tableName = dynamodbConfig.tables.default.alias as string;

  logger.debug(`${FILE}::FETCHING_DATA`, {
    userId,
    tableName,
  });

  const resp = await query(tableName, 'userId = :u', { ':u': userId });
  logger.debug(`${FILE}::RECORDS_FETCHED_SUCCESSFULLY`, { resp });

  return resp;
};
