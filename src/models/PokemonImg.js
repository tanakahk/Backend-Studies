const { Model } = require("objection")
const knex = require("../db/knex")

Model.knex(knex)

class PokemonImg extends Model {
  static get tableName() {
    return "pokemon_images"
  }

  static get idColumn() {
    return "id"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["pokemon_id", "url"],
      properties: {
        id: { type: "integer" },
        url: { type: "string", minLength: 1, maxLength: 255 },
        pokemon_id: { type: "integer" },
      },
    }
  }

  // static get relationMappings() { }

  // static get modifiers() { }
}

module.exports = PokemonImg
