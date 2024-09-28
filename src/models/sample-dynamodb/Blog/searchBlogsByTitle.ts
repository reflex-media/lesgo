import { scan } from 'lesgo/utils/dynamodb';
import { isEmpty, logger } from 'lesgo/utils';
import dynamodbConfig from '@config/dynamodb';
import ErrorException from '@exceptions/ErrorException';

const FILE = 'models.sample-dynamodb.Blog/searchBlogsByTitle';

export default async (title: string, returnFields?: string) => {
  const tableAlias = dynamodbConfig.tables.default.alias as string;

  logger.debug(`${FILE}::FETCHING_DATA`, {
    title,
    returnFields,
    tableAlias,
  });

  let opts: {
    FilterExpression: string;
    ProjectionExpression?: string;
    ExpressionAttributeValues?: Record<string, string>;
  } = {
    FilterExpression: 'title = :t',
    ExpressionAttributeValues: { ':t': title },
  };

  if (!isEmpty(returnFields)) {
    opts = {
      ...opts,
      ProjectionExpression: returnFields,
    };
  }

  const resp = await scan(tableAlias, opts);

  if (isEmpty(resp) || resp.length < 1) {
    throw new ErrorException(
      'Unable to find record',
      `${FILE}::NO_RECORD_FOUND`,
      404,
      { title }
    );
  }

  return resp;
};
