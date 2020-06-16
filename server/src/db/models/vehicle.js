const { DataTypes } = require('sequelize');

const vehicleModel = {
  imageUrl: DataTypes.STRING,
  name: DataTypes.STRING,
  price: DataTypes.DECIMAL(11, 2),
};

module.exports = (sequelize) => {
  const vehicle = sequelize.define(
    'vehicle',
    vehicleModel,
  );

  vehicle.associate = (dbModels) => {
    vehicle.belongsTo(dbModels.colour);
    vehicle.belongsTo(dbModels.warranty, {
      foreignKey: 'warrantyId',
        targetKey: 'id'
    });
  };

  return vehicle;
};
