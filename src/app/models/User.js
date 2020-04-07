import Sequelize, { Model } from 'sequelize';
import { compare } from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  checkPassword(password) {
    return compare(password, this.password_hash);
  }
}

export default User;
