import Sequelize, { Model } from 'sequelize';

class AvatarCourier extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://${process.env.NODE_HOST}:${process.env.NODE_PORT}/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default AvatarCourier;
