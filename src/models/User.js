const { Model } = require("objection")
const knex = require("../db/knex")

Model.knex(knex)

class User extends Model {
  static get tableName() {
    return "users"
  }

  static get idColumn() {
    return "id"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "username"],
      properties: {
        id: { type: "integer" },
        created_at: { type: "timestamp" },
        updated_at: { type: "timestamp" },
        deleted_at: { type: "timestamp" },

        name: { type: "string", minLength: 1, maxLength: 100 },
        username: { type: "string", minLength: 1, maxLength: 45 },
        pwd: { type: "string", minLength: 1, maxLength: 255 },
      },
    }
  }

  static get relationMappings() {
    const Pokemon = require("./Pokemon")
    const UserPokemon = require("./UserPokemon")
    const Billing = require("./Billing")

    return {
      pokemons: {
        relation: Model.ManyToManyRelation,
        modelClass: Pokemon,
        join: {
          from: "users.id",
          through: {
            modelClass: UserPokemon,
            from: "user_pokemons.user_id",
            to: "user_pokemons.pokemon.id",
          },
          to: "pokemons.id"
        },
      },
      billings: {
        relation: Model.HasManyRelation,
        modelClass: Billing,
        join: {
          from: "users.id",
          to: "billings.user_id",
        },
      },
    }
  }

  // static get modifiers() { }
}

module.exports = User
