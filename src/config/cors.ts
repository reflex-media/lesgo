export default {
  // only allowed one domain
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSMultipleAllowOriginNotAllowed
  allowOrigin: process.env.CORS_ALLOW_ORIGIN || '*',
  // Use csv for multiple value
  allowMethods: process.env.CORS_ALLOW_METHODS || '*',
  allowHeaders: process.env.CORS_ALLOW_HEADERS || '*',
};
