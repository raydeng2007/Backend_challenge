const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');

// Current api version.
const app = express();

app.use(bodyParser.json()); // Support for JSON-encoded bodies
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(morgan('combined'));

// Public endpoints
app.use('/colours', require('./routes/colors'));
app.use('/vehicles', require('./routes/vehicles'));
app.use('/warranties', require('./routes/warranties'));

// Unhandled Rejection & Exception.
process.on('unhandledRejection', (reason, promise) => {
  console.error('Promise', promise);
  console.error('Reason: ', reason);
});

process.on('uncaughtException', (err) => {
  console.error('uncaughtException error', err);
});

module.exports = app;
