export default {
  /*
   *--------------------------------------------------------------------------
   * JWT Secret
   *--------------------------------------------------------------------------
   *
   * Here your jwt secret key. In order to verify a token injected in
   * "Authorization" header, we should have way to decrypt that token
   * and validate things.
   *
   */

  secret: 'YOUR-JWT-TOKEN-HERE',

  /*
   *--------------------------------------------------------------------------
   * Issuer
   *--------------------------------------------------------------------------
   *
   * Here your issuer validation, if you would like to validate the issuer
   * you could add the lists of domains below and activate the validation.
   *
   */

  iss: {
    validate: false,
    data: ['api.domain.com'],
  },

  /*
   *--------------------------------------------------------------------------
   * Custom Claims
   *--------------------------------------------------------------------------
   *
   * Here your custom claims validation, if you would like to validate
   * the custom claims, you could add the lists of those claims below
   * and activate the validation.
   *
   * Read More: https://auth0.com/docs/tokens/jwt-claims
   *
   */

  customClaims: {
    validate: false,
    data: ['user'],
  },
};
