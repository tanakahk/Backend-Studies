const express = require('express')
const postLogin = require('../../controllers/auth/postLogin')
const router = express.Router();

router.post("/login", postLogin)

router.get("/heathz", (req, res) => {
  res.send("OK")
})

module.exports = router;
