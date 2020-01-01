const router = require("express").Router();
const User = require("../schemas/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");

//register normal
router.post("/register", async (req, res) => {
  //check for fields
  if (!req.body.name)
    return res.status(400).send({ error: "name cannot be empty" });
  if (!req.body.email)
    return res.status(400).send({ error: "email cant be empty" });
  if (!req.body.password)
    return res.status(400).send({ error: "password cant be empty" });

  //check si el mail ya existe
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send({ error: "email already in use" });

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //crear nuevo usuario
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });
  try {
    const savedUser = await user.save();
    res.send({ message: "account created" });
  } catch (err) {
    res.status(400).send(err);
  }
});

//login normal
router.post("/login", async (req, res) => {
  //check for fields
  if (!req.body.email)
    return res.status(400).send({ error: "email cannot be empty" });
  if (!req.body.password)
    return res.status(400).send({ error: "password cannot be empty" });

  // check mail no existe
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({ error: "email or password incorrect" });

  //check password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).send({ error: "email or password incorrect" });

  // crear y asignar jwt
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res
    .header("auth-token", token)
    .send({ token: token, user: user, message: "logged in" });
});

module.exports = router;
