const { primaryKey, tableDate, foreignKey } = require('../utils/helpers');

module.exports = {
  // eslint-disable-next-line no-unused-vars, arrow-body-style
  up: async (queryInterface, DataTypes) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      console.log('Creating warranties table...');
      await queryInterface.createTable(
        'warranties',
        {
          id: primaryKey(DataTypes),
          createdAt: tableDate(DataTypes),
          updatedAt: tableDate(DataTypes),
          price: DataTypes.DECIMAL(11, 2),
          name: DataTypes.STRING,
        },
        { transaction },
      );

      console.log('Adding warrantyId to vehicles table...');
      await queryInterface.addColumn(
        'vehicles',
        'warrantyId',
        foreignKey(DataTypes, 'warranties', 'SET NULL'),
        { transaction },
      );
    });
  },

  // eslint-disable-next-line no-unused-vars, arrow-body-style
  down: async (queryInterface, DataTypes) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      console.log('Removing warrantyId from vehicles table...');
      await queryInterface.removeColumn(
        'vehicles',
        'warrantyId',
        { transaction },
      );

      console.log('Dropping warranties table...');
      await queryInterface.dropTable(
        'warranties',
        { transaction },
      );
    });
  },
};
