import { put } from 'lesgo/utils/dynamodb';
import dynamodbConfig from 'config/dynamodb';
import logger from 'lesgo/utils/logger';
import getCurrentTimestamp from 'lesgo/utils/getCurrentTimestamp';
import { InsertBlogModelInput } from 'types/blogs';

const FILE = 'models/Blog/insertBlog';

export default async (params: InsertBlogModelInput) => {
  const { blogsTable } = dynamodbConfig.tables;

  const dateTimeNow = getCurrentTimestamp();

  const insertData = {
    ...params,
    isDeleted: false,
    createdAt: dateTimeNow,
    updatedAt: dateTimeNow,
    deletedAt: null,
  };

  logger.debug(`${FILE}::STORING DATA TO DYNAMODB`, {
    insertData,
    blogsTable,
  });
  const resp = await put(blogsTable.name, insertData);
  logger.debug(`${FILE}::DATA STORED SUCCESSFULLY TO DYNAMODB`, { resp });

  return resp;
};
