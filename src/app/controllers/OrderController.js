import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Couriers from '../models/Couriers';

class OrderController {
  async index(req, res) {
    const { page } = req.query;

    const orders = await Order.findAll({
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(orders);
  }
}

export default new OrderController();
