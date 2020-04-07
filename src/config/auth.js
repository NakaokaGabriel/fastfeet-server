import 'dotenv/config';

export default {
  payload: process.env.TOKEN_PAYLOAD,
  expiresIn: process.env.TOKEN_EXPIRE,
};
