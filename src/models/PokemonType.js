const { Model } = require("objection")
const knex = require("../db/knex")

Model.knex(knex)

class PokemonType extends Model {
  static get tableName() {
    return "pokemon_types"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["pokemon_id", "type_id"],
      properties: {
        pokemon_id: { type: "integer" },
        type_id: { type: "integer" },
      },
    }
  }

  // static get relationMappings() { }

  // static get modifiers() { }
}

module.exports = PokemonType
