import { query } from 'lesgo/utils/dynamodb';
import dynamodbConfig from 'config/dynamodb';
import logger from 'lesgo/utils/logger';
import ErrorException from 'exceptions/ErrorException';
import { BlogQueryOutput } from 'types/blogs';

const FILE = 'models/Blog/getBlogsContent';

export default async (userId: string, returnFields: string) => {
  const { blogsTable } = dynamodbConfig.tables;

  logger.debug(`${FILE}::FETCHING DATA`, {
    userId,
    blogsTable,
    returnFields,
  });

  const resp = <Partial<BlogQueryOutput>>await query(
    blogsTable.name,
    'userId = :u',
    { ':u': userId },
    {
      projectionExpression: returnFields,
    }
  );
  logger.debug(`${FILE}::DATA FETCHED SUCCESSFULLY`, { resp });

  if (resp.length > 0) {
    return resp;
  }

  throw new ErrorException(
    'Unable to find record',
    `${FILE}::NO_RECORD_FOUND`,
    404,
    { returnFields, userId }
  );
};
