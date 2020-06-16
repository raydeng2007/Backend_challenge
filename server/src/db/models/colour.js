/* eslint-disable func-names */
const { DataTypes } = require('sequelize');

const colourModel = {
  hexCode: DataTypes.STRING,
  name: DataTypes.STRING,
};

module.exports = (sequelize) => {
  const colour = sequelize.define(
    'colour',
    colourModel,
  );

  colour.associate = (dbModels) => {
    colour.hasMany(dbModels.vehicle);
  };

  return colour;
};
