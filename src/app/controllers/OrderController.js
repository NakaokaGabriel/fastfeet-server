import { isAfter, parseISO, formatISO } from 'date-fns';

import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Couriers from '../models/Couriers';

class OrderController {
  async store(req, res) {
    const { recipient, deliveryman, product, start_date } = req.body;

    const dateIsBefore = isAfter(parseISO(start_date), new Date());

    if (!dateIsBefore) {
      return res
        .status(401)
        .json({ error: 'You can`t create an order in earlier date' });
    }

    const [startHour, endHour] = ['08:00', '18:01'];

    const [formatDate] = formatISO(parseISO(start_date), {
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
      start_date,
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
}

export default new OrderController();
