import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

class SessionController {
  async store(req, res) {
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validations failed' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password is invalid' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
