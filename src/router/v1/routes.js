const express = require('express')
const postLogin = require('../../controllers/auth/postLogin');
const postSignup = require('../../controllers/auth/postSignup');
const getUsers = require("../../controllers/users/get")

const router = express.Router();

// middleware
const { jwtAuthenticate } = require("../../helpers/jwtHelpers");

router.post("/login", postLogin)
router.post("/signup", postSignup)

router.get("/users", jwtAuthenticate, getUsers)
router.get("/heathz", (req, res) => {
  res.send("OK")
})

module.exports = router;
