import Sequelize, { Model } from 'sequelize';

class Couriers extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(model) {
    this.belongsTo(model.CourierAvatar, {
      foreignKey: 'avatar_id',
      as: 'couriers_avatar',
    });
  }
}

export default Couriers;
