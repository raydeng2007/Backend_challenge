const { primaryKey, tableDate, foreignKey } = require('../utils/helpers');

module.exports = {
  // eslint-disable-next-line no-unused-vars, arrow-body-style
  up: async (queryInterface, DataTypes) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      console.log('Creating colours table...');
      await queryInterface.createTable(
        'colours',
        {
          id: primaryKey(DataTypes),
          createdAt: tableDate(DataTypes),
          updatedAt: tableDate(DataTypes),
          hexCode: DataTypes.STRING,
          name: DataTypes.STRING,
        },
        { transaction },
      );

      console.log('Creating vehicles table...');
      await queryInterface.createTable(
        'vehicles',
        {
          id: primaryKey(DataTypes),
          createdAt: tableDate(DataTypes),
          updatedAt: tableDate(DataTypes),
          imageUrl: DataTypes.STRING,
          name: DataTypes.STRING,
          colourId: foreignKey(DataTypes, 'colours', 'SET NULL'),
          price: DataTypes.DECIMAL(11, 2),
        },
        { transaction },
      );
    });
  },

  // eslint-disable-next-line no-unused-vars, arrow-body-style
  down: async (queryInterface, DataTypes) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      console.log('Dropping vehicles table...');
      await queryInterface.dropTable('vehicles', { transaction });

      console.log('Dropping colours table...');
      await queryInterface.dropTable('colours', { transaction });
    });
  },
};
