module.exports = {
  api: {
    port: 4000,
  },
  database: {
    username: 'developer',
    password: process.env.DATABASE_PASSWORD,
    name: 'interview',
    sequelizeOptions: {
      // Inside docker it will use the env variables, outside it will use the defaults
      host: process.env.DATABASE_HOST || '0.0.0.0',
      port: process.env.DATABASE_PORT || 5433,
      dialect: 'postgres',
      dialectOptions: {
        ssl: null,
      },
      operatorsAliases: false,
      pool: {
        max: 5,
        idle: 10000,
      },
      maxConcurrentQueries: 100,
      logging: false,
      language: 'en',
    },
  },
};
