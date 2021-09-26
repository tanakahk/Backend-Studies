const { Model } = require("objection")
const knex = require("../db/knex")

Model.knex(knex)

class Pokemon extends Model {
  static get tableName() {
    return "pokemons"
  }

  static get idColumn() {
    return "id"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "height", "weight", "price"],
      properties: {
        id: { type: "integer" },
        created_at: { type: "timestamp" },
        updated_at: { type: "timestamp" },
        deleted_at: { type: "timestamp" },

        name: { type: "string", minLength: 1, maxLength: 45 },
        height: { type: "integer" },
        weight: { type: "integer" },
        price: { type: "integer" },
      },
    }
  }

  static get relationMappings() {
    const User = require("./User")
    const UserPokemon = require("./UserPokemon")
    const PokemonImg = require("./PokemonImg")
    const Type = require("./Type")
    const PokemonType = require("./PokemonType")

    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "pokemons.id",
          through: {
            modelClass: UserPokemon,
            from: "user_pokemons.pokemon_id",
            to: "user_pokemons.user_id",
          },
          to: "users.id",
        },
      },
      imgs: {
        relation: Model.HasManyRelation,
        modelClass: PokemonImg,
        join: {
          from: "pokemons.id",
          to: "pokemon_images.pokemon_id",
        },
      },
      types: {
        relation: Model.ManyToManyRelation,
        modelClass: Type,
        join: {
          from: "pokemons.id",
          through: {
            modelClass: PokemonType,
            from: "pokemon_types.pokemon_id", //aqui o yoyo usou user_types, mas eu acho que ele errou
            to: "pokemon_types.type_id",
          },
          to: "types.id"
        },
      }
    }
  }

  // static get modifiers() { }
}

module.exports = Pokemon
