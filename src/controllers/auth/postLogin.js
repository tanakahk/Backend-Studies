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
  
  const user = await User.query().where({ name: req.body.username }).first()
  if (!user) {
    response.status = "USER_NOT_FOUND"
    return res.status(401).json(response)
  }
  console.log("user", user);
  
  return res.json(response)
}

module.exports = postLogin
