const { Model } = require("objection")
const knex = require("../db/knex")

Model.knex(knex)

class UserPokemon extends Model {
  static get tableName() {
    return "user_pokemons"
  }

  static get idColumn() {
    return "id"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["pokemon_id", "user_id"],
      properties: {
        id: { type: "integer" },
        created_at: { type: "timestamp" },
        updated_at: { type: "timestamp" },
        deleted_at: { type: "timestamp" },

        pokemon_id: { type: "integer" },
        user_id: { type: "integer" },
      },
    }
  }

//   static get relationMappings() { }

//   static get modifiers() { }
}

module.exports = UserPokemon
