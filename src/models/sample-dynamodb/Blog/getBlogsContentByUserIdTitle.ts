import { query } from 'lesgo/utils/dynamodb';
import dynamodbConfig from 'config/dynamodb';
import logger from 'lesgo/utils/logger';
import ErrorException from 'exceptions/ErrorException';
import { BlogQueryOutput } from 'types/blogs';

const FILE = 'models/Blog/getBlogsContentByUserIdTitle';

export default async (title: string, userId: string, returnFields?: string) => {
  const { blogsTable } = dynamodbConfig.tables;

  logger.debug(`${FILE}::FETCHING DATA`, {
    title,
    userId,
    blogsTable,
  });
  let opts: {
    filterExpression: string;
    projectionExpression?: string;
    singletonConn?: string;
  } = {
    filterExpression: 'title = :t',
  };

  if (typeof returnFields !== 'undefined') {
    opts = {
      ...opts,
      projectionExpression: returnFields,
    };
  }

  const resp = <Partial<BlogQueryOutput>>(
    await query(
      blogsTable.name,
      'userId = :u',
      { ':u': userId, ':t': title },
      opts
    )
  );

  if (resp.length > 0) {
    return resp;
  }

  throw new ErrorException(
    'Unable to find record',
    `${FILE}::NO_RECORD_FOUND`,
    404,
    { title, userId }
  );
};
