import middy from '@middy/core';
import { sqsMiddleware } from 'lesgo/middlewares';
import { generateUid, logger, validateFields } from 'lesgo/utils';
import insertBlog from '@models/sample-dynamodb/Blog/insertBlog';

const FILE = 'handlers.sample-sqs.dequeue';

const dequeueHandler = async (event: CreateBlogSQSEvent) => {
  logger.debug(`${FILE}::EVENT_RECEIVED`, { event });

  const records = event.Records as CreateBlogSQSRecord[];
  let countSuccess = 0;
  let countFail = 0;

  const processRecord = async (record: CreateBlogSQSRecord) => {
    try {
      const { body } = record;
      const blogId = generateUid();

      const input = validateFields(body, [
        { key: 'userId', type: 'string', required: true },
        { key: 'title', type: 'string', required: true },
        { key: 'snippet', type: 'string', required: true },
        { key: 'content', type: 'string', required: true },
        { key: 'isPublished', type: 'boolean', required: true },
        { key: 'publishedAt', type: 'number', required: true },
        { key: 'author', type: 'object', required: true },
      ]) as CreateBlogRequestInput;

      const insertData = {
        ...input,
        blogId,
        author: {
          name: input.author.name,
        },
      };

      const resp = await insertBlog(insertData);
      countSuccess += 1;
      logger.debug(`${FILE}::RECORD_INSERTED`, {
        resp,
        countSuccess,
        countFail,
      });
    } catch (err) {
      countFail += 1;
      logger.error(`${FILE}::RECORD_INSERT_ERROR`, {
        err,
        record,
        countSuccess,
        countFail,
      });
    }
  };

  await Promise.all(records.map(record => processRecord(record)));

  logger.info(`${FILE}::RECORDS_INSERTED_COMPLETED`, {
    countSuccess,
    countFail,
  });
};

export const handler = middy().use(sqsMiddleware()).handler(dequeueHandler);

export default handler;
