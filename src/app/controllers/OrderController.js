import { isAfter, parseISO, formatISO } from 'date-fns';

import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Couriers from '../models/Couriers';
import AvatarCourier from '../models/AvatarCourier';

class OrderController {
  async store(req, res) {
    const { recipient, deliveryman, product, startDate } = req.body;

    const dateIsBefore = isAfter(parseISO(startDate), new Date());

    if (!dateIsBefore) {
      return res
        .status(401)
        .json({ error: 'You can`t create an order in earlier date' });
    }

    const [startHour, endHour] = ['08:00', '18:01'];

    const [formatDate] = formatISO(parseISO(startDate), {
      representation: 'time',
    }).split('-');

    if (formatDate < startHour) {
      return res
        .status(400)
        .json({ error: 'To create order shoud be created after of 08:00' });
    }

    if (formatDate > endHour) {
      return res
        .status(400)
        .json({ error: 'To create order shoud be created before of 18:00' });
    }

    const recipientExist = await Recipient.findByPk(recipient);

    if (!recipientExist) {
      return res.status(400).json({ error: 'this recipient does not exist' });
    }

    const deliverymanExist = await Couriers.findByPk(deliveryman);

    if (!deliverymanExist) {
      return res.status(400).json({ error: 'this deliveryman does not exist' });
    }

    const orders = await Order.create({
      recipient_id: recipient,
      deliveryman_id: deliveryman,
      product,
      start_date: startDate,
    });

    return res.json(orders);
  }

  async index(req, res) {
    const { page } = req.query;

    const orders = await Order.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'complement',
            'state',
            'city',
            'cep',
          ],
        },
        {
          model: Couriers,
          as: 'courier',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.json(orders);
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      recipient,
      deliveryman,
      product,
      canceled,
      startDate,
      endDate,
    } = req.body;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ error: 'Order is not found' });
    }

    const dateIsBefore = isAfter(parseISO(startDate), new Date());

    if (!dateIsBefore) {
      return res
        .status(401)
        .json({ error: 'You can`t update an order in earlier date' });
    }

    const [startHour, endHour] = ['08:00', '18:01'];

    const [formatDate] = formatISO(parseISO(startDate), {
      representation: 'time',
    }).split('-');

    if (formatDate < startHour) {
      return res
        .status(400)
        .json({ error: 'To create order shoud be created after of 08:00' });
    }

    if (formatDate > endHour) {
      return res
        .status(400)
        .json({ error: 'To create order shoud be created before of 18:00' });
    }

    const recipientExist = await Recipient.findByPk(recipient);

    if (!recipientExist) {
      return res.status(400).json({ error: 'this recipient does not exist' });
    }

    const deliverymanExist = await Couriers.findByPk(deliveryman);

    if (!deliverymanExist) {
      return res.status(400).json({ error: 'this deliveryman does not exist' });
    }

    const update = await order.update({
      recipient_id: recipient,
      deliveryman_id: deliveryman,
      product,
      canceled_at: canceled || null,
      start_date: startDate,
      end_date: endDate || null,
    });

    return res.json(update);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const orders = await Order.findByPk(id);

    if (!orders) {
      return res.status(400).json({ error: 'Order does not exist' });
    }

    await orders.destroy();

    return res.json({ message: 'Order was destroy with successfull' });
  }

  async show(req, res) {
    const { id } = req.params;

    const order = await Order.findOne({
      where: {
        id,
      },

      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'cep',
          ],
        },
        {
          model: Couriers,
          as: 'courier',
          attributes: ['id', 'name', 'email', 'avatar_id'],
        },
      ],
    });

    if (!order) {
      return res.status(400).json({ error: 'Order does not exist' });
    }

    const courierAvatarId = order.courier.avatar_id;

    const courierAvatar = await AvatarCourier.findByPk(courierAvatarId);

    return res.json({ order, courier_avatar: courierAvatar });
  }
}

export default new OrderController();
