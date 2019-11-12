import config from 'Config/aws';
import S3Service from 'lesgo/src/services/S3Service';

const s3 = new S3Service(config.s3.options);

const getObject = (objectKey, bucketName) => {
  return s3.getObject(objectKey, bucketName);
};

export { getObject };
export default s3;
