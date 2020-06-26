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
    this.belongsTo(model.AvatarCourier, {
      foreignKey: 'avatar_id',
      as: 'avatar_couriers',
    });
    this.belongsTo(model.Signature, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
  }
}

export default Couriers;
