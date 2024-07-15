import { query } from 'lesgo/utils/dynamodb';
import { logger } from 'lesgo/utils';
import dynamodbConfig from '../../../config/dynamodb';

const FILE = 'models.sample-dynamodb.Blog.getBlogByUserIdBlogId';

export default async (userId: string, blogId: string) => {
  const tableName = dynamodbConfig.tables.defaultTableName;

  logger.debug(`${FILE}::FETCHING_DATA`, {
    userId,
    blogId,
    tableName,
  });

  const resp = await query(tableName, 'userId = :u AND blogId = :b', {
    ':u': userId,
    ':b': blogId,
  });
  logger.debug(`${FILE}::RECORDS_FETCHED_SUCCESSFULLY`, { resp });

  return resp?.[0];
};
