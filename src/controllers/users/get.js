const User = require('../../models/User')

const get = async (req, res) => {
  const response = {status: "ERROR"}

  const user = await User.query().where({ name: req.body.name })
  if (!user) {
    response.status = "USER_NOT_FOUND"
    return res.status(401).json(response)
  }
  
  response.status = "OK"
  response.results = user

  return res.json(response)
}

module.exports = get
