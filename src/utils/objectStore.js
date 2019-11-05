import config from 'Config/aws';
import { S3Service } from 'lesgo/services';

const objectStore = new S3Service(config.s3.options);

const getObject = (objectKey, bucketName) => {
  return objectStore.getObject(objectKey, bucketName);
};

export { getObject };
export default objectStore;
