import * as Yup from 'yup';

import Courier from '../models/Couriers';
import AvatarCourier from '../models/AvatarCourier';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  avatar_id: Yup.number().integer().required(),
  email: Yup.string().email().required(),
});

class CourierController {
  async store(req, res) {
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Failed' });
    }

    const { name, avatar_id, email } = req.body;

    const avatarExist = await AvatarCourier.findByPk(avatar_id);

    if (!avatarExist) {
      return res.status(400).json({ error: 'Avatar not found' });
    }

    const emailExist = await Courier.findOne({
      where: {
        email,
      },
    });

    if (emailExist) {
      return res.status(401).json({ error: 'Email already exist' });
    }

    await Courier.create({
      name,
      email,
      avatar_id,
    });

    return res.json({ ok: true });
  }

  async index(req, res) {
    const { page } = req.query;

    const couriers = await Courier.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: AvatarCourier,
          as: 'avatar_couriers',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return res.json(couriers);
  }
}

export default new CourierController();
