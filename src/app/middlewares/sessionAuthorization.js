import { verify } from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const [, token] = authHeader.split(' ');

  try {
    await promisify(verify)(token, authConfig.secret);

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'token unathourized' });
  }
};
