export default {
  index: process.env.ES_INDEX || 'lesgo',

  type: process.env.ES_TYPE || '_doc',

  /*
   *--------------------------------------------------------------------------
   * Default Elastic Connection
   *--------------------------------------------------------------------------
   *
   * The custom connections that we have right now are
   *   "aws" -> custom AWS Signed Connection
   *   null  -> the default Connection of Elastic Search
   *
   * When using "aws" we are relying to the lambda's access to the elastic search, as a default it will automatically
   * signed the connection into it, just make sure that your lambda lives into the same elastic search account.
   */

  connection: 'aws',

  /*
   *--------------------------------------------------------------------------
   * Elastic Search Options
   *--------------------------------------------------------------------------
   *
   * Your reference for the elastic search options
   *      https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-configuration.html#_basic_options
   */

  options: {
    maxRetries: 1,

    nodes: process.env.ES_NODES.split(','),

    awsRegion: process.env.AWS_ACCOUNT_REGION,
  },
};
