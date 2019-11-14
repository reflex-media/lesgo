export default {
  // as of the moment, we only added the memcached driver.
  default: 'memcached',

  connections: {
    memcached: {
      url: process.env.ELASTICACHE_MEMCACHED_URL,
      options: {
        autoDiscover: true,
        autoDiscoverInterval: 60000,
        autoDiscoverOverridesRemove: false,
        // maxKeySize: 250,              // the maximum key size allowed.
        // maxExpiration: 2592000,       // the maximum expiration time of keys (in seconds).
        // maxValue: 1048576,            // the maximum size of a value.
        // poolSize: 10,                 // the maximum size of the connection pool.
        // algorithm: 'md5',             // the hashing algorithm used to generate the hashRing values.
        // reconnect: 18000000,          // the time between reconnection attempts (in milliseconds).
        // timeout: 5000,                // the time after which Memcached sends a connection timeout (in milliseconds).
        // retries: 5,                   // the number of socket allocation retries per request.
        // failures: 5,                  // the number of failed-attempts to a server before it is regarded as 'dead'.
        // retry: 30000,                 // the time between a server failure and an attempt to set it up back in service.
        // remove: false,                // if true, authorizes the automatic removal of dead servers from the pool.
        // failOverServers: undefined,   // an array of server_locations to replace servers that fail and that are removed from the consistent hashing scheme.
        // keyCompression: true,         // whether to use md5 as hashing scheme when keys exceed maxKeySize.
        // idle: 5000,                   // the idle timeout for the connections.
        // encoding: utf8,               // encoding of data when socket as a readable stream
      },
    },
  },
};
