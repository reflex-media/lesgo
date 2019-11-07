import config from 'Config/elasticSearch';
import { ElasticSearchService } from 'lesgo/services';

const es = (conn = null) => {
  return new ElasticSearchService({
    ...config.adapters[conn || config.default],
  });
};

export default es;
