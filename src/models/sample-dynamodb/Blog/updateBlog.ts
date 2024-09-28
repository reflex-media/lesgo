import { updateRecord } from 'lesgo/utils/dynamodb';
import { logger, getCurrentTimestamp } from 'lesgo/utils';
import dynamodbConfig from '@config/dynamodb';

const FILE = 'models.sample-dynamodb.Blog.updateBlog';

export default async (params: UpdateBlogRequestInput) => {
  const tableAlias = dynamodbConfig.tables.default.alias as string;

  const updatedAt = getCurrentTimestamp();

  logger.debug(`${FILE}::PREPARINT_TO_UPDATE_RECORD`, {
    params,
    updatedAt,
    tableAlias,
  });

  const resp = await updateRecord(
    { userId: params.userId, blogId: params.blogId },
    tableAlias,
    'SET snippet = :snippet, updatedAt = :updatedAt',
    {
      ':snippet': params.snippet || '',
      ':updatedAt': updatedAt,
    }
  );
  logger.debug(`${FILE}::RECORD_UPDATED_SUCCESSFULLY`, { resp });

  return resp;
};
