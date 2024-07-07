export default {
  queues: {
    lesgoQueue: {
      name: `${process.env.APP_NAME}-${process.env.APP_ENV}-lesgoQueue`,
      url: `https://sqs.${process.env.AWS_ACCOUNT_REGION}.amazonaws.com/${
        process.env.AWS_ACCOUNT_ID
      }/${`${process.env.APP_NAME}-${process.env.APP_ENV}-lesgoQueue`}`,
    },
  },
};
