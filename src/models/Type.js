const { Model } = require("objection")
const knex = require("../db/knex")

Model.knex(knex)

class Type extends Model {
  static get tableName() {
    return "types"
  }

  static get idColumn() { // yoyo n colocou, mas eu acho q tem q ter
    return "id"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["type"],
      properties: {
        id: { type: "integer" },
        type: { type: "string", minLength: 1, maxLength: 45 },
      },
    }
  }

  // static get relationMappings() { }

  // static get modifiers() { }
}

console.log("User.tableName", User.tableName);

module.exports = Type