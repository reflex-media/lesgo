export default {
  /*
   *--------------------------------------------------------------------------
   * JWT Secret
   *--------------------------------------------------------------------------
   *
   * Here your jwt secret key. In order to verify a token injected in
   * "Authorization" header, we should have way to decrypt that token
   * and validate things. This should be a SHA256 key.
   *
   */

  secret: process.env.JWT_SECRET,

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
    validate: process.env.JWT_ISS_SHOULD_VALIDATE,
    data: process.env.JWT_ISS_DOMAINS
      ? process.env.JWT_ISS_DOMAINS.split(',')
      : [],
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
    validate: process.env.JWT_CUSTOM_CLAIMS_SHOULD_VALIDATE,
    data: process.env.JWT_CUSTOM_CLAIMS_DATA
      ? process.env.JWT_CUSTOM_CLAIMS_DATA.split(',')
      : [],
  },
};
