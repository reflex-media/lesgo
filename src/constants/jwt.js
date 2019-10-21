export const secret = 'YOUR-JWT-TOKEN-HERE';

export const validate = {
  iss: false,
  tokenTypes: true,
  customClaims: true,
};

export const config = {
  iss: ['api.domain.com'],
  tokenTypes: ['Bearer'],
  customClaims: ['user'],
};

export default { validate, config, secret };
