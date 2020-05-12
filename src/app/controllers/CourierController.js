import Courier from '../models/Couriers';

class CourierController {
  async index(req, res) {
    return res.json({ ok: true });
  }
}

export default new CourierController();
