const knex = require("../db/knex")
const expect = require("chai").expect
const server = require("../server")

const TEST_TIMEOUT = 5000

const init = () => {
  describe("Tests", function () {
    this.timeout(TEST_TIMEOUT)

    before((done) => {
      knex.migrate
        .latest()
        .then(() => knex.seed.run())
        .then(() => done())
    })

    it("nome do teste", (done) => {
      expect("a").equal("a")
      // expect("a").equal("b")
      done()
    })

    it("valida soma", (done) => {
      expect(sum(1,2)).equal(3)
      done()
    })
  })
}

init()

const sum = (a, b) => a + b
