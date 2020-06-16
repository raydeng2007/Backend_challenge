const path = require('path');
const fs = require('fs');
const moment = require('moment');
const loadUmzug = require('../utils/load-umzug');
const migrations = require('../utils/migrations');

const umzug = loadUmzug();

function cmdStatus() {
  const result = {};

  return umzug.executed()
    .then((executed) => {
      result.executed = executed;
      return umzug.pending();
    })
    .then((pending) => {
      result.pending = pending;
      return result;
    })
    .then(({ executed, pending }) => {
      const current = executed.length > 0 ? executed[0].file : '<NO_MIGRATIONS>';
      const status = {
        current,
        executed: executed.map((migration) => migration.file),
        pending: pending.map((migration) => migration.file),
      };
      console.log(JSON.stringify(status, null, 2));

      return { executed, pending };
    });
}

function cmdMigrateNext() {
  return migrations.dropFunctions(umzug.storage.sequelize)
    .then(() => migrations.dropViews(umzug.storage.sequelize))
    .then(() => umzug.pending())
    .then((pending) => pending.map((migration) => path.basename(migration.file, '.js')))
    .then((pendingMigrations) => {
      if (pendingMigrations.length === 0) {
        return Promise.reject(new Error('Already at initial state'));
      }
      const next = pendingMigrations[0];
      return umzug.up({ to: next });
    });
}

function cmdResetPrev() {
  return umzug.executed()
    .then((executed) => executed.map((migration) => path.basename(migration.file, '.js')))
    .then((executedMigrations) => {
      if (executedMigrations.length === 0) {
        return Promise.reject(new Error('Already at initial state'));
      }
      const prev = executedMigrations[executedMigrations.length - 1];
      return umzug.down({ to: prev });
    });
}

function runMigration(name) {
  let migrationName = '';

  if (name) {
    migrationName = name.trim();
  }
  return umzug.up(migrationName);
}

function generateMigration(name) {
  const directoryPath = __dirname;
  let migrationName = 'unnamed';

  if (name) {
    migrationName = name.trim();
  }

  const templateFilename = path.join(directoryPath, 'migration.template');
  const migrationTemplate = fs.readFileSync(templateFilename);

  const timeStamp = moment(new Date()).format('YYYYMMDDHHmmss');
  const newMigrationFilePath = path.join(directoryPath, `../migrations/${timeStamp}-${migrationName}.js`);
  fs.writeFileSync(newMigrationFilePath, migrationTemplate);
}

let userInput = '';
if (process.argv[2]) {
  userInput = process.argv[2].trim();
}

function parseUserInput() {
  let functionToExecute;

  switch (userInput) {
    case '':
    case 'status':
      functionToExecute = cmdStatus;
      break;

    case 'up':
    case 'migrate':
      functionToExecute = () => umzug.up();
      break;

    case 'next':
    case 'migrate-next':
      functionToExecute = () => cmdMigrateNext();
      break;

    case 'prev':
    case 'reset-prev':
      functionToExecute = () => cmdResetPrev();
      break;

    case 'run':
      functionToExecute = () => runMigration(process.argv[3]);
      break;

    case 'create':
    case 'generate':
    case 'new':
      functionToExecute = () => generateMigration(process.argv[3]);
      break;

    case 'refresh':
    case 'refreshviewsandfunctions':
    case 'refresh-views-and-functions':
      functionToExecute = () => migrations.refreshViewsAndFunctions(umzug.storage.sequelize);
      break;

    case 'drop':
    case 'dropviewsandfunctions':
    case 'drop-views-and-functions':
      functionToExecute = () => migrations.dropViewsAndFunctions(umzug.storage.sequelize);
      break;

    case 'dropviews':
    case 'drop-views':
      functionToExecute = () => migrations.dropViews(umzug.storage.sequelize);
      break;

    case 'dropfunctions':
    case 'drop-functions':
      functionToExecute = () => migrations.dropFunctions(umzug.storage.sequelize);
      break;

    default:
      console.log(`invalid cmd: ${userInput}`);
      process.exit(1);
  }
  return functionToExecute;
}

(async function runMigrationCLI() {
  let exitCode = 1;

  try {
    const functionToExecute = parseUserInput();
    await functionToExecute();

    console.log('Migration-cli: finished');
    exitCode = 0;
  } catch (error) {
    const errorStr = `${userInput.toUpperCase()} ERROR`;
    console.log(errorStr);
    console.log('='.repeat(errorStr.length));
    console.log(error);
    console.log('='.repeat(errorStr.length));
  } finally {
    process.exit(exitCode);
  }
}());
