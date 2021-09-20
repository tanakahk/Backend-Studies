const express = require('express')
const router = express.Router();

router.get("", (req, res) => {
  console.log("Chamadas V1");
  res.send("Chamadas V1")
})

router.post("/login", (req, res) => {
  res.send(req.body)
})

router.get("/users/:userId", (req, res) => {
  res.json({
    params: req.params,
    query: req.query,
    body: req.body,
  })
})

module.exports = router;
