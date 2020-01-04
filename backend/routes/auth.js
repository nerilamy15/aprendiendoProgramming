const router = require("express").Router();
const User = require("../schemas/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");

//register normal
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  //check for fields
  /*if (!name)
    return res.status(400).send({ error: "name cannot be empty" });
  if (!email)
    return res.status(400).send({ error: "email cant be empty" });
  if (!password)
    return res.status(400).send({ error: "password cant be empty" });*/

  //check si el mail ya existe
  const emailExist = await User.findOne({ email });
  if (emailExist)
    return res
      .status(400)
      .send({ code: 460, error: "email is already in use" });
  // check if username exist
  const userName = await User.findOne({ name });
  if (userName)
    return res.status(400).send({ code: 461, error: "name is already in use" });
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //crear nuevo usuario
  const user = new User({
    name,
    email,
    password: hashPassword
  });
  try {
    const savedUser = await user.save();
    res.send({ message: "account created" });
  } catch (err) {
    res.status(500).send({ code: 500, error: "unexpected error" });
  }
});

//login normal
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //check for fields
  /*if (!email || !password) {
    return res.status(400).send({ code: 400, error: "fields cannot be empty" });
  }*/

  // check mail no existe
  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(400)
      .send({ code: 462, error: "email or password incorrect" });

  //check password
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass)
    return res
      .status(400)
      .send({ code: 463, error: "email or password incorrect" });

  // crear y asignar jwt
  try {
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res
      .header("auth-token", token)
      .send({ token: token, user: user, message: "logged in" });
  } catch (err) {
    res.status(500).send({ code: 500, error: "unexpected error" });
  }
});

module.exports = router;
