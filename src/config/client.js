export default {
  /*
   *--------------------------------------------------------------------------
   * Default Header value
   *--------------------------------------------------------------------------
   *
   * Here you may specify what header key to use to pass for client identificaiton.
   */
  headerKey: 'x-client-id',

  /*
   *--------------------------------------------------------------------------
   * Clients
   *--------------------------------------------------------------------------
   *
   * Here are each of the clients setup to have access to your application.
   * `key` property is used for external identification, while the key is used for internal.
   * Both `key` and `secret` are used for Basic authentication.
   * Other user-defined propoerties can defined as well for access under `handler.event.platform`, when a match exists.
   */
  clients: {
    myApp: {
      key: process.env.MY_APP_KEY,
      secret: process.env.MY_APP_SECRET,
      some: 'value',
    },
  },
};
