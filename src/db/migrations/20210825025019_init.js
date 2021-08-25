
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id");
    table.timestamp("created_at").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"))
    table.timestamp("updated_at").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"))
    table.timestamp("deleted_at")
    table.string("name", 100).notNullable()
    table.string("username", 45).notNullable()
    table.string("pwd")
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable("users")
};
