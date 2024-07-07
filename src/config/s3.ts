export default {
  region: process.env.AWS_S3_BUCKET_REGION,
  lesgoLiteBucket: {
    bucket: process.env.AWS_S3_BUCKET || '',
    path: 'test',
    uri: process.env.AWS_S3_BUCKET_URI,
  },
};
