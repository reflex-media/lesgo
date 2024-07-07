import { update } from 'lesgo/utils/dynamodb';
import dynamodbConfig from 'config/dynamodb';
import logger from 'lesgo/utils/logger';
import getCurrentTimestamp from 'lesgo/utils/getCurrentTimestamp';

const FILE = 'models/Blog/insertBlog';

type Arguments = {
  content: string;
  userId: string;
  blogId: string;
};

export default async (params: Arguments) => {
  const { blogsTable } = dynamodbConfig.tables;

  const updatedAt = getCurrentTimestamp();

  logger.debug(`${FILE}::UPDATING DATA TO DYNAMODB`, {
    params,
    updatedAt,
    blogsTable,
  });
  const resp = await update(
    blogsTable.name,
    { userId: params.userId, blogId: params.blogId },
    'SET content = :content, updatedAt = :updatedAt',
    {
      ':content': params.content,
      ':updatedAt': updatedAt,
    }
  );
  logger.debug(`${FILE}::DATA UPDATED SUCCESSFULLY TO DYNAMODB`, { resp });

  return resp;
};
