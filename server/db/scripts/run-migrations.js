const migrations = require('../utils/migrations');

(async function runMigrations() {
  let exitCode = 1;

  try {
    await migrations.run();
    console.log('Migrations complete!');
    exitCode = 0;
  } catch (error) {
    console.log('Error running migrations', error);
  } finally {
    process.exit(exitCode);
  }
}());
