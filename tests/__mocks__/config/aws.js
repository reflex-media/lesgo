export default {
  sqs: {
    queues: {
      sampleQueue: {
        url: jest.fn(),
      },
    },
  },
  s3: jest.fn(),
  sentry: {
    enabled: true,
  },
};
