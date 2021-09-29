const { jwtSign } = require('../../helpers/jwtHelpers')
const { pwdCompare } = require('../../helpers/pwdHelpers')
const User = require('../../models/User')

const validateRequest = (req, response) => {
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

const postLogin = async (req, res) => {
  const response = {status: "ERROR"}
  
  if (!validateRequest(req, response)) {
    return res.status(400).json(response)
  }
  
  const user = await User.query().where({ username: req.body.username }).first()
  if (!user) {
    response.status = "USER_NOT_FOUND"
    return res.status(401).json(response)
  }

  if (!pwdCompare(req.body.pwd, user.pwd)) {
    response.status = "WRONG_PASSWORD"
    return res.status(401).json(response)
  }
  
  response.status = "OK"
  response.result = {
    id: user.id,
    name: user.name,
    token: jwtSign({ id: user.id }),
  }
  return res.json(response)
}

module.exports = postLogin
