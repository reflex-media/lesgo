import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { httpMiddleware } from 'lesgo/middlewares';
import { generateUid, isEmpty, logger, validateFields } from 'lesgo/utils';
import { deleteMessage, receiveMessages } from 'lesgo/utils/sqs';
import appConfig from '../../config/app';
import insertBlog from '../../models/sample-dynamodb/Blog/insertBlog';
import ErrorException from '../../exceptions/ErrorException';

const FILE = 'handlers.sample-sqs.dequeueFifo';

interface InsertRecordInput {
  userId: string;
  title: string;
  snippet: string;
  content: string;
  isPublished: boolean;
  publishedAt: number;
  author: {
    name: string;
  };
}

const dequeueFifoHandler = async () => {
  const messagesFetched = await receiveMessages('httpEventQueue.fifo', {
    maxNumberOfMessages: 5,
    waitTimeSeconds: 1,
  });

  logger.debug(`${FILE}::MESSAGES_FETCHED_FROM_QUEUE`, { messagesFetched });

  if (
    isEmpty(messagesFetched.Messages) ||
    messagesFetched.Messages?.length === 0
  ) {
    throw new ErrorException(
      'No messages in the queue',
      `${FILE}::NO_MESSAGES_IN_QUEUE`,
      404
    );
  }

  const records = messagesFetched.Messages;
  let countSuccess = 0;
  let countFail = 0;

  await records!.reduce(async (promise, record) => {
    await promise;

    try {
      const body = JSON.parse(record.Body!);
      const blogId = generateUid();

      const input = validateFields(body, [
        { key: 'userId', type: 'string', required: true },
        { key: 'title', type: 'string', required: true },
        { key: 'snippet', type: 'string', required: true },
        { key: 'content', type: 'string', required: true },
        { key: 'isPublished', type: 'boolean', required: true },
        { key: 'publishedAt', type: 'number', required: true },
        { key: 'author', type: 'object', required: true },
      ]) as InsertRecordInput;

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

      await deleteMessage('httpEventQueue.fifo', record.ReceiptHandle!);
      logger.debug(`${FILE}::MESSAGE_DELETED`, { record });
    } catch (err) {
      countFail += 1;
      logger.error(`${FILE}::RECORD_INSERT_ERROR`, {
        err,
        record,
        countSuccess,
        countFail,
      });
    }
  }, Promise.resolve());

  logger.info(`${FILE}::RECORDS_INSERT_COMPLETED`, { countSuccess, countFail });
  return {
    message: 'Records inserted successfully',
    countSuccess,
    countFail,
  };
};

export const handler = middy()
  .use(httpMiddleware({ debugMode: appConfig.debug }))
  .handler(dequeueFifoHandler);

export default handler;
