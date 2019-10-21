/* eslint-disable import/no-named-as-default-member */
import { JwtService } from 'lesgo/services';
import JwtConstant from 'Constants/jwt';
import ErrorException from 'Exceptions/ErrorException';

const token = headers => {
  if (!headers.Authorization) {
    throw new ErrorException('Authorization Header is required!');
  }

  const parsed = headers.Authorization.split(' ');

  if (
    JwtConstant.validate.tokenTypes &&
    JwtConstant.config.tokenTypes.indexOf(parsed[0]) === -1
  ) {
    throw new ErrorException(`Token type ${parsed[0]} is not supported!`);
  }

  if (!parsed[1]) {
    throw new ErrorException('Missing token!');
  }

  return parsed[1];
};

const verifyJwtToken = () => {
  return {
    before: (handler, next) => {
      const { headers } = handler.event;

      try {
        const service = new JwtService({
          token: token(headers),
          settings: JwtConstant,
        });

        // eslint-disable-next-line no-param-reassign
        handler.event.decodedJwt = service.validate().decoded;
      } catch (err) {
        err.code = 403;
        err.statusCode = 403;

        throw err;
      }

      next();
    },
  };
};

export default verifyJwtToken;
