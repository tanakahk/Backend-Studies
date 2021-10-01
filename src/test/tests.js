const request = require("supertest")
const knex = require("../db/knex")
const expect = require("chai").expect
const server = require("../server")

const TEST_TIMEOUT = 5000

const user = {
  id: "",
  name: "Tanaka",
  username: "tanaka",
  pwd: "senha secreta 2020",
  token: "",
}

const init = () => {
  describe("Tests", function () {
    this.timeout(TEST_TIMEOUT)

    before((done) => {
      knex.migrate
        .latest()
        .then(() => knex.seed.run())
        .then(() => done())
        .catch((err) => console.log(err))
    })

    it("nome do teste", (done) => {
      expect("a").equal("a")
      done()
    })

    it("valida soma", (done) => {
      expect(sum(1, 2)).equal(3)
      done()
    })

    it("Signup", (done) => {
      request(server)
        .post("/v1/signup")
        .send({ name: user.name, username: user.username, pwd: user.pwd })
        .then((res) => {
          // console.log("Signup", res.body);
          expect(res.body.status).equal("OK")
          expect(res.body.result.name).equal(user.name)
          expect(res.body.result.id).not.equal("")
          expect(res.body.result.token).not.equal("")
          user.id = res.body.result.id
          user.token = res.body.result.token
          done()
        })
    })

    it("Signup - No Name", (done) => {
      request(server)
        .post("/v1/signup")
        .send({})
        .then((res) => {
          // console.log("Signup", res.body);
          expect(res.statusCode).equal(400)
          expect(res.body.status).equal("NO_NAME")
          done()
        })
    })

    it("Signup - No Username", (done) => {
      request(server)
        .post("/v1/signup")
        .send({ name: user.name })
        .then((res) => {
          // console.log("Signup", res.body);
          expect(res.statusCode).equal(400)
          expect(res.body.status).equal("NO_USERNAME")
          done()
        })
    })

    it("Signup - No PWD", (done) => {
      request(server)
        .post("/v1/signup")
        .send({ name: user.name, username: user.username })
        .then((res) => {
          // console.log("Signup", res.body);
          expect(res.statusCode).equal(400)
          expect(res.body.status).equal("NO_PASSWORD")
          done()
        })
    })

    it("Login", (done) => {
      request(server)
        .post("/v1/login")
        .send({ username: user.username, pwd: user.pwd })
        .then((res) => {
          // console.log("Login", res.body);
          expect(res.body.status).equal("OK")
          expect(res.body.result.id).not.equal("")
          expect(res.body.result.token).not.equal("")
          expect(res.body.result.name).equal(user.name)
          done()
        })
    })

    it("Login - No User", (done) => {
      request(server)
        .post("/v1/login")
        .send({ pwd: user.pwd })
        .then((res) => {
          // console.log("Login", res.body);
          expect(res.statusCode).equal(400)
          expect(res.body.status).equal("NO_USERNAME")
          done()
        })
    })

    it("Login - No PWD", (done) => {
      request(server)
        .post("/v1/login")
        .send({ username: user.username })
        .then((res) => {
          // console.log("Login", res.body);
          expect(res.statusCode).equal(400)
          expect(res.body.status).equal("NO_PASSWORD")
          done()
        })
    })

    it("Login - User not Found", (done) => {
      request(server)
        .post("/v1/login")
        .send({ username: "user.username", pwd: user.pwd })
        .then((res) => {
          // console.log("Login", res.body);
          try {
            expect(res.statusCode).equal(401)
            expect(res.body.status).equal("USER_NOT_FOUND")
            done()
          } catch (err) {
            done(err)
          }
        })
    })

    it("Login - Wrong PWD", (done) => {
      request(server)
        .post("/v1/login")
        .send({ username: user.username, pwd: "user.pwd" })
        .then((res) => {
          // console.log("Login", res.body);
          try {
            expect(res.statusCode).equal(401)
            expect(res.body.status).equal("WRONG_PASSWORD")
            done()
          } catch (err) {
            done(err)
          }
        })
    })
  })
}

init()

const sum = (a, b) => a + b
