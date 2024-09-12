import { putRecord } from 'lesgo/utils/dynamodb';
import { logger, getCurrentTimestamp } from 'lesgo/utils';
import dynamodbConfig from '../../../config/dynamodb';

const FILE = 'models.sample-dynamodb.Blog/insertBlog';

export default async (params: CreateBlogRequestInput) => {
  const tableName = dynamodbConfig.tables.default.alias as string;

  const dateTimeNow = getCurrentTimestamp();

  const insertData = {
    ...params,
    isDeleted: false,
    createdAt: dateTimeNow,
    updatedAt: dateTimeNow,
    deletedAt: null,
  };

  logger.debug(`${FILE}::INSERTING_RECORD`, {
    insertData,
    tableName,
  });
  const resp = await putRecord(insertData, tableName);
  logger.debug(`${FILE}::RECORD_INSERTED`, { resp });

  return resp;
};
