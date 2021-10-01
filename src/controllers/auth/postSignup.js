const { jwtSign } = require('../../helpers/jwtHelpers')
const { pwdEncode } = require('../../helpers/pwdHelpers')
const User = require('../../models/User')

const validateRequest = (req, response) => {
  if (!req.body.name) {
    response.status = "NO_NAME"
    return false
  }

  if (!req.body.username) {
    response.status = "NO_USERNAME"
    return false
  }

  if (!req.body.pwd) {
    response.status = "NO_PASSWORD"
    return false
  }
  return true
}

const postSignup = async (req, res) => {
  const response = { status: "ERROR" }

  if (!validateRequest(req, response)) {
    return res.status(400).json(response)
  }

  const user = await User.query().where({ name: req.body.name }).first()
  if (user) {
    response.status = "USER_EXISTS"
    return res.status(401).json(response) // yoyo usou 400
  }

  const newUser = await User.query().insert({
    name: req.body.name,
    username: req.body.username,
    pwd: pwdEncode(req.body.pwd),
  })
  if (newUser instanceof User) {
    response.status = "OK"
    response.result = {
      id: newUser.id,
      name: newUser.name,
      token: jwtSign({ id: newUser.id }),
    }
  }
  return res.json(response)
}

module.exports = postSignup
