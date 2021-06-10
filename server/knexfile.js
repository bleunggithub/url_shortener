require('dotenv').config()

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.PG_DATABASE,
      user:     process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations'
    }
  },
    test: {
    client: 'pg',
    connection: {
      database: process.env.PG_TEST_DATABASE,
      user:     process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD
    },
    migrations: {
      tableName: 'knex_migrations'
    },
  },

};
