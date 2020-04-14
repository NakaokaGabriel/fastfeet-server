module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('couriers', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: { model: 'avatar_couriers', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('couriers', 'avatar_id');
  },
};
