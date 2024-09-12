import { deleteRecord } from 'lesgo/utils/dynamodb';
import { logger } from 'lesgo/utils';
import dynamodbConfig from '../../../config/dynamodb';

const FILE = 'models.sample-dynamodb.Blog.deleteBlog';

export default async (params: DeleteBlogRequestInput) => {
  const tableAlias = dynamodbConfig.tables.default.alias as string;

  logger.debug(`${FILE}::DELETING_RECORD`, {
    params,
    tableAlias,
  });
  const resp = await deleteRecord(params, tableAlias);
  logger.debug(`${FILE}::RECORD_DELETED_SUCCESSFULLY`, { resp });

  return resp;
};
