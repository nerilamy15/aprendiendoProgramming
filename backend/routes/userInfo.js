const router = require("express").Router();
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");
const Info = require("../schemas/info");

//user

router.post("/user", verify, async (req, res) => {
  const { animal, color, result } = req.body;
  const info = new Info({
    animal,
    color,
    result
  });
  try {
    const savedInfo = await info.save();
    res.status(200).send({ successCode: 200 });
  } catch (err) {
    res.status(400).send({ errorCode: 464 });
  }
});

module.exports = router;
