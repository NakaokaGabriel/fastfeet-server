import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Couriers from '../models/Couriers';

class OrderController {
  async index(req, res) {
    return res.json({ ok: true });
  }
}

export default new OrderController();
