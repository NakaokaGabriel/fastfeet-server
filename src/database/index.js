import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Couriers from '../app/models/Couriers';
import AvatarCourier from '../app/models/AvatarCourier';
import Order from '../app/models/Order';
import Signature from '../app/models/Signature';

const models = [User, Recipient, Couriers, AvatarCourier, Order, Signature];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
