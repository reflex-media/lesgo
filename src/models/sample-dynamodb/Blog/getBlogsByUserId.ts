import { query } from 'lesgo/utils/dynamodb';
import dynamodbConfig from 'config/dynamodb';
import logger from 'lesgo/utils/logger';
import { BlogQueryOutput } from 'types/blogs';

const FILE = 'models/Blog/getBlogsByUserId';

export default async (userId: string) => {
  const { blogsTable } = dynamodbConfig.tables;

  logger.debug(`${FILE}::FETCHING DATA`, {
    userId,
    blogsTable,
  });
  const resp = <BlogQueryOutput>(
    await query(blogsTable.name, 'userId = :u', { ':u': userId })
  );
  logger.debug(`${FILE}::DATA FETCHED SUCCESSFULLY`, { resp });

  return resp;
};
