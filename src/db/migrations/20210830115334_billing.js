const { createdAt, updatedAt, foreign } = require("../helpers");

exports.up = function (knex) {
  return knex.schema
    .createTable("users_pokemons", function (table) {
      table.increments("id")
      createdAt(knex, table)
      updatedAt(knex, table)
      table.timestamp("deleted_at")
      foreign(table, "user_id", "users")
      foreign(table, "pokemon_id", "pokemons")
    })
    .createTable("billings", function (table) {
      table.increments("id")
      createdAt(knex, table)
      updatedAt(knex, table)
      table.timestamp("deleted_at")
      table.specificType("trx_type", "bit(1)")
      table.integer("amount")
      foreign(table, "user_id", "users")
      foreign(table, "user_pokemon_id", "users_pokemons")
    })
};

exports.down = function (knex) {
  return knex.schema
    .table("users_pokemons", function (table) {
      table.dropForeign("user_id")
      table.dropForeign("pokemon_id")
    })
    .table("billings", function (table) {
      table.dropForeign("user_id")
      table.dropForeign("user_pokemon_id")
    })
    .dropTable("users_pokemons")
    .dropTable("billings")
};
