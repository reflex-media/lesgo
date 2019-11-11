import config from 'Config/aws';
import { SQSService } from 'lesgo';

const queue = new SQSService(config.sqs.options, config.sqs.queues);

const dispatch = (payload, queueName) => {
  return queue.dispatch(payload, queueName);
};

export { dispatch };
export default queue;
