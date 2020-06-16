const Sequelize = require('sequelize');
const Umzug = require('umzug');
const config = require('../../config');

function loadUmzug(sequelize) {
  // Load sequelize if it wasn't supplied as an argument.
  if (!(sequelize)) {
    config.database.sequelizeOptions.pool.maxIdleTime = 10000;

    // eslint-disable-next-line no-param-reassign
    sequelize = new Sequelize(
      config.database.name,
      config.database.username,
      config.database.password,
      config.database.sequelizeOptions,
    );
  }

  const umzugOpts = {
    storage: 'sequelize',
    storageOptions: {
      sequelize,
    },
    migrations: {
      params: [
        sequelize.getQueryInterface(), // queryInterface
        sequelize.constructor, // DataTypes
        () => {
          throw new Error('Migration tried to use old style "done" callback.'
          + 'Please upgrade to "umzug" and return a promise instead.');
        },
      ],
      path: './db/migrations',
      pattern: /\.js$/,
    },
    logging: () => {
      // console.log.apply(null, arguments);
    },
  };
  const umzug = new Umzug(umzugOpts);

  function logUmzugEvent(eventName) {
    return (name) => {
      console.log(`${name} ${eventName}`);
    };
  }

  umzug.on('migrating', logUmzugEvent('migrating'));
  umzug.on('migrated', logUmzugEvent('migrated'));
  umzug.on('reverting', logUmzugEvent('reverting'));
  umzug.on('reverted', logUmzugEvent('reverted'));

  return umzug;
}

module.exports = loadUmzug;
