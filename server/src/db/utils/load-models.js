const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const moment = require('moment');
const R = require('ramda');

function loadModels(sequelize) {
  const db = {
    views: {},
  };
  const modelPath = path.join(__dirname, '../models');
  const isDirectory = source => fs.lstatSync(source).isDirectory();


  // Load model folders
  const directoriesToIgnore = [
    '__mocks__',
    'views',
  ];
  const isValidDirectoryName = (source) => {
    const folderName = R.last(source.split('/'));
    return !directoriesToIgnore.includes(folderName);
  };

  fs.readdirSync(modelPath)
    .map(name => path.join(modelPath, name))
    .filter(R.allPass([isDirectory, isValidDirectoryName]))
    .forEach(
      (directorySource) => {
        fs.readdirSync(directorySource)
          .filter(file => (file.indexOf('.') !== 0) && (file === 'index.js') && (file.substr(-3) === '.js'))
          .forEach((file) => {
            const model = sequelize.import(path.join(directorySource, file));
            db[model.name] = model;
          });
      },
    );

  // Load model files
  fs.readdirSync(modelPath)
    .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.substr(-3) === '.js'))
    .forEach((file) => {
      const model = sequelize.import(path.join(modelPath, file));
      db[model.name] = model;
    });

  Object.keys(db)
    .filter(modelName => modelName !== 'views')
    .forEach((modelName) => {
      if ('associate' in db[modelName]) {
        db[modelName].associate(db);
      }
    });

  db.sequelize = sequelize;

  // Fix float conversion "feature" in node-postgres
  // eslint-disable-next-line global-require
  Sequelize.postgres.DECIMAL.parse = value => parseFloat(value);
  Sequelize.postgres.DATEONLY.parse = value => (value ? moment(value).toDate() : null);

  return db;
}

module.exports = loadModels;
