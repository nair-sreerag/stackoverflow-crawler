// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const { SERVER } = require("./config");
const { username, password, host, port, database } = SERVER;

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host,
      port,
      database,
      user: username,
      password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "mysql2",
    connection: {
      host,
      port,
      database,
      user: username,
      password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
