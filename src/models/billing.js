const { Model } = require("objection")
const knex = require("../db/knex")

Model.knex(knex)

class Billing extends Model {
  static get tableName() {
    return "billings"
  }

  static get idColumn() {
    return "id"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["pokemon_id", "user_id", "trx_type", "amount"],
      properties: {
        id: { type: "integer" },
        created_at: { type: "timestamp" },
        updated_at: { type: "timestamp" },
        deleted_at: { type: "timestamp" },

        trx_type: { type: "integer" }, // 0- sell; 1- buy
        amount: { type: "integer" },

        user_id: { type: "integer" },
        pokemon_id: { type: "integer" },
      },
    }
  }

  // static get relationMappings() { }

  // static get modifiers() { }
}

module.exports = Billing
