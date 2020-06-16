const app = require('./app');
const config = require('../config/config');

(async function runServer() {
  try {
    if (module.parent) {
      return null;
    }

    app.listen(config.api.port, '0.0.0.0', (expressError) => {
      if (expressError) {
        throw expressError;
      }
      console.log('Running - 🌎 Listening on port %s', config.api.port);
    });
  } catch (error) {
    console.error('Error starting server', error);
  }

  return null;
}());
