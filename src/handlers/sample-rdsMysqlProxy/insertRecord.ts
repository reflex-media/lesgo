import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { disconnectMiddleware, httpMiddleware } from 'lesgo/middlewares';
import { disconnectDb } from 'lesgo/utils/db/mysql/proxy';
import { validateFields } from 'lesgo/utils';
import insertMovie from '../../models/sample-rdsMysqlProxy/Movie/insertMovie';

interface InsertRecordInput {
  title: string;
  synopsis: string;
  isReleased: boolean;
  releasedAt: number;
  director: {
    name: string;
  };
}

type MiddyAPIGatewayProxyEvent = APIGatewayProxyEvent & {
  body: InsertRecordInput;
};

const insertRecordHandler = async (event: MiddyAPIGatewayProxyEvent) => {
  const { body } = event;

  const input = validateFields(body, [
    { key: 'title', type: 'string', required: true },
    { key: 'synopsis', type: 'string', required: true },
    { key: 'isReleased', type: 'boolean', required: true },
    { key: 'releasedAt', type: 'number', required: true },
    { key: 'director', type: 'object', required: true },
  ]) as InsertRecordInput;

  const resp = await insertMovie(input);
  return {
    message: 'Movie inserted successfully',
    ...resp,
  };
};

export const handler = middy()
  .use(
    disconnectMiddleware({
      clients: [disconnectDb],
    })
  )
  .use(httpMiddleware())
  .handler(insertRecordHandler);

export default handler;
