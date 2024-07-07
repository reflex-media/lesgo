export default {
  default: 'memcache',
  adapters: {
    memcache: {
      options: {
        hosts: [process.env.AWS_ELASTICACHE_MEMCACHE_HOST],
        autodiscover: true,
      },
    },
  },
};
