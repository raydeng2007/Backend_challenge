const Sequelize = require('sequelize');
const loadModels = require('../utils/load-models');
const config = require('../../../config');

const sequelize = new Sequelize(
  config.database.name,
  config.database.username,
  config.database.password,
  config.database.sequelizeOptions,
);

module.exports = loadModels(sequelize);
