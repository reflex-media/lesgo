import { URL } from 'url';

export default {
  /*
   *--------------------------------------------------------------------------
   * Default Elastic Connection
   *--------------------------------------------------------------------------
   *
   * When using "aws" we are relying to the lambda's access to the ElasticSearch, as a default it will automatically
   * signed the connection into it, just make sure that your lambda lives into the same ElasticSearch account.
   */

  default: 'aws',

  /*
   *--------------------------------------------------------------------------
   * Elastic Search Adapters
   *--------------------------------------------------------------------------
   *
   * This is where it lives all the adapters.
   *
   * Your reference for the elastic search options
   *      https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-configuration.html#_basic_options
   *
   * The custom connections that we have right now are
   *   "aws" -> custom AWS Signed Connection
   *   null  -> the default Connection of Elastic Search
   *
   */

  adapters: {
    aws: {
      connection: 'aws',
      index: process.env.ES_INDEX || 'lesgo',
      type: process.env.ES_TYPE || '_doc',
      options: {
        node: [
          {
            url: new URL(process.env.ES_NODE),
            maxRetries: 1,
            awsRegion: process.env.ES_REGION,
          },
        ],
      },
    },

    native: {
      connection: null,
      index: process.env.ES_INDEX || 'lesgo',
      type: process.env.ES_TYPE || '_doc',
      options: {
        node: [
          {
            url: new URL(process.env.ES_NODE),
            maxRetries: 1,
          },
        ],
      },
      cloud: {
        id: 'abcdefghijklmnop===',
      },
      auth: {
        username: 'elastic',
        password: 'changeme',
        apiKey: 'base64EncodedKey',
      },
    },
  },
};
