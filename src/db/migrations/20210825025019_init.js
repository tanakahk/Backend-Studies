const { createdAt, updatedAt } = require("../helpers");

exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id");
    createdAt(knex, table)
    updatedAt(knex, table)
    table.timestamp("deleted_at")
    table.string("name", 100).notNullable()
    table.string("username", 45).notNullable()
    table.string("pwd")
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable("users")
};
