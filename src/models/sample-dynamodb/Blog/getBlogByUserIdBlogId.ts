import { query } from 'lesgo/utils/dynamodb';
import { isEmpty, logger } from 'lesgo/utils';
import dynamodbConfig from '../../../config/dynamodb';
import ErrorException from '../../../exceptions/ErrorException';

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

  if (isEmpty(resp) || resp!.length < 1) {
    throw new ErrorException(
      'Unable to find record',
      `${FILE}::NO_RECORD_FOUND`,
      404,
      { blogId, userId }
    );
  }

  return resp?.[0];
};
