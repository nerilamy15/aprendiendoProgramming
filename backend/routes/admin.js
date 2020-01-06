//admin
const router = require("express").Router();
const User = require("../schemas/user");
const verify = require("./verifyToken");

//get all users
router.get("/admin/users", verify, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ code: 200, users });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

//get one user
router.get("/admin/:userId", verify, async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.status(200).send({ code: 200, message: user });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

// delete user
router.delete("/admin/:userId", verify, async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.remove({ _id: userId });
    res.status(200).send({ code: 200, deletedUser });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

// edit user info
router.patch("/admin/:userId", verify, async (req, res) => {
  try {
    const { userId } = req.params;
    const { role, name, email, password } = req.body;
    const updatedUser = await User.updateOne(
      { _id: userId },
      { $set: { role, name, email, password } }
    );
    res.status(200).send({ code: 200, updatedUser });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

module.exports = router;
