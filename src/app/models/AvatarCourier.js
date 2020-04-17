import Sequelize, { Model } from 'sequelize';

class AvatarCourier extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default AvatarCourier;
