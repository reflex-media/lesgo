import { scan } from 'lesgo/utils/dynamodb';
import { isEmpty, logger } from 'lesgo/utils';
import dynamodbConfig from '../../../config/dynamodb';
import ErrorException from '../../../exceptions/ErrorException';

const FILE = 'models.sample-dynamodb.Blog/searchBlogsByTitle';

export default async (title: string, returnFields?: string) => {
  const tableName = dynamodbConfig.tables.defaultTableName;

  logger.debug(`${FILE}::FETCHING_DATA`, {
    title,
    returnFields,
    tableName,
  });

  let opts: {
    filterExpression: string;
    projectionExpression?: string;
    expressionAttributeValues?: Record<string, string>;
    singletonConn?: string;
  } = {
    filterExpression: 'title = :t',
    expressionAttributeValues: { ':t': title },
  };

  if (!isEmpty(returnFields)) {
    opts = {
      ...opts,
      projectionExpression: returnFields,
    };
  }

  const resp = await scan(tableName, opts);

  if (isEmpty(resp) || resp!.length < 1) {
    throw new ErrorException(
      'Unable to find record',
      `${FILE}::NO_RECORD_FOUND`,
      404,
      { title }
    );
  }

  return resp;
};
