import { deleteRecord } from 'lesgo/utils/dynamodb';
import dynamodbConfig from 'config/dynamodb';
import logger from 'lesgo/utils/logger';

const FILE = 'models/Blog/deleteBlog';

export default async (params: { userId: string; blogId: string }) => {
  const { blogsTable } = dynamodbConfig.tables;

  logger.debug(`${FILE}::DELETING DATA`, {
    params,
    blogsTable,
  });
  const resp = await deleteRecord(blogsTable.name, params);
  logger.debug(`${FILE}::DATA DELETED SUCCESSFULLY`, { resp });

  return resp;
};
