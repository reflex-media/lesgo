import config from 'Config/elasticSearch';
import { ElasticSearchService } from 'lesgo/services';

const es = (cf = null) => {
  return new ElasticSearchService(cf || config);
};

export default es;
