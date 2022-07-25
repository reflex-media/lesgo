export default {
  /*
   *--------------------------------------------------------------------------
   * Default Header value
   *--------------------------------------------------------------------------
   *
   * Here you may specify what header key to use to pass for client identificaiton.
   * It can be passed through headers or through url parameters
   */
  headerKeys: ['x-client-id', 'X-Client-Id'],

  /*
   *--------------------------------------------------------------------------
   * Callback on Success
   *--------------------------------------------------------------------------
   *
   * Here you may call a callback after a successful verification is confirmed
   */
  callback: async handler => {
    handler.event.site = {
      id: handler.event.platform,
      ...this.clients[handler.event.site],
    };
  },

  /*
   *--------------------------------------------------------------------------
   * Clients
   *--------------------------------------------------------------------------
   *
   * Here are each of the clients setup to have access to your application.
   * `key` property is used for external identification, while the key is used for internal.
   * Both `key` and `secret` are used for Basic authentication.
   *
   * `isAuthOptional` boolean or promise property can be passed as well, which skips authentication whenever basic auth is not provided,
   * and only throws an authentication error when a basic auth is provided with incorrect credentials
   *
   * Other user-defined propoerties can defined as well for access when a match exists
   * ```
   * import client from 'Config/client';
   *
   * console.log(client[handler.event.platform]);
   * ```
   */
  clients: {
    myApp: {
      key: process.env.MY_APP_KEY,
      secret: process.env.MY_APP_SECRET,
      some: 'value',
    },
    myPublicApp: {
      key: 'public-app',
      get isAuthOptional() {
        return new Promise(resolve => resolve(true));
      },
    },
  },
};
