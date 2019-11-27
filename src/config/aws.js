export default {
  sqs: {
    options: {
      accessKeyId: process.env.AWS_SQS_OPTIONS_ACCESS_KEY_ID || null,
      secretAccessKey: process.env.AWS_SQS_OPTIONS_SECRET_ACCESS_KEY || null,
      region: process.env.AWS_SQS_OPTIONS_REGION || null,
    },
    queues: {
      sampleQueue: {
        name: `lesgo-${process.env.APP_ENV}-sampleQueue`,
        url: `https://sqs.${process.env.AWS_ACCOUNT_REGION}.amazonaws.com/${
          process.env.AWS_ACCOUNT_ID
        }/${`lesgo-${process.env.APP_ENV}-sampleQueue`}`,
      },
    },
  },
  s3: {
    options: {
      accessKeyId: process.env.AWS_S3_OPTIONS_ACCESS_KEY_ID || null,
      secretAccessKey: process.env.AWS_S3_OPTIONS_SECRET_ACCESS_KEY || null,
      region: process.env.AWS_S3_OPTIONS_REGION || null,
    },
  },
};
