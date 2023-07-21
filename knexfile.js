// Update with your config settings.

/**
 * @type {Object.<string, import("knex").Knex.Config>}
 */
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3",
    },
    useNullAsDefault: true, // sqlite3 için gerekli bir ayar
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};
