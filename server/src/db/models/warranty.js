/* Migration not done */
const { DataTypes } = require('sequelize');

const warrantyModel = {
  price: DataTypes.DECIMAL(11, 2),
  name: DataTypes.STRING,
};

module.exports = (sequelize) => {
  const warranty = sequelize.define(
    'warranty',
    warrantyModel,
  );

  warranty.associate = (dbModels) => {
    warranty.hasMany(dbModels.vehicle, {
        foreignKey: 'warrantyId',
        sourceKey: 'id'
    });
  };

  return warranty;
};
