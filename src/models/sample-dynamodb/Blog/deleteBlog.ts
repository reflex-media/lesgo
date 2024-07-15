import { deleteRecord } from 'lesgo/utils/dynamodb';
import { logger } from 'lesgo/utils';
import dynamodbConfig from '../../../config/dynamodb';

const FILE = 'models.sample-dynamodb.Blog.deleteBlog';

export interface DeleteBlogModelInput {
  blogId: string;
  userId: string;
}

export default async (params: DeleteBlogModelInput) => {
  const tableName = dynamodbConfig.tables.defaultTableName;

  logger.debug(`${FILE}::DELETING_RECORD`, {
    params,
    tableName,
  });
  const resp = await deleteRecord(params, tableName);
  logger.debug(`${FILE}::RECORD_DELETED_SUCCESSFULLY`, { resp });

  return resp;
};
