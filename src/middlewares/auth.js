import InvalidAuthorizedTokenError from '../exceptions/invalidAuthorizedTokenException';
import { verify, sign } from '../libs/jwt';

const bypassPathList = ['/api/user'];
export const verifyJWT = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  try {
    if (bearerToken) {
      const token = bearerToken.replace(/^Bearer /, '');
      const user = verify(token);
      if (!user) {
        throw new Error();
      }
      req.user = user;
    } else {
      const { path } = req;
      const found = bypassPathList.find((p) => p === path);
      if (!found) {
        throw new Error();
      }
    }
    next();
  } catch (err) {
    next(
      new InvalidAuthorizedTokenError(err.message || 'Invalid Bearer Token'),
    );
  }
};
export const signing = (UUID) => sign({ UUID });
