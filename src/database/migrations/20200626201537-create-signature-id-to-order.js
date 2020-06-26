module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('couriers', 'signature_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'signatures', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('couriers', 'signature_id');
  },
};
