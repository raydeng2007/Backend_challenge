const loadUmzug = require('./load-umzug');

async function runMigrations(sequelize) {
  const umzug = loadUmzug(sequelize);

  const pending = await umzug.pending();
  if (pending.length > 0) {
    console.log('Running migrations...');
    await umzug.up();
    console.log('Finished');
  } else {
    console.log('No pending migrations');
  }
}

module.exports = {
  run: runMigrations,
};
