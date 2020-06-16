// Reference https://github.com/Abazhenov/express-async-handler
const asyncHandler = (route, logging = true, callNext = false) => (
  async (...args) => {
    const req = args[0];
    const next = args[args.length - 1];

    try {
      if (logging && req && req.originalUrl) {
        console.log(`START - ${req.method} ${req.originalUrl}`);
      }

      await route(...args);

      if (logging && req && req.originalUrl) {
        console.log(`END - ${req.method} ${req.originalUrl}`);
      }
    } catch (err) {
      next(err || new Error('Undefined error'));
    }

    // Used for middleware. Routes that are successful shouldn't call next()
    if (callNext) {
      next();
    }
  }
);

module.exports = {
  asyncHandler,
};
