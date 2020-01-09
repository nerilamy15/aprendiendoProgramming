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
router.get("/admin/user/:userId", verify, async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.status(200).send({ code: 235, user });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

// delete user
router.delete("/admin/user/:userId", verify, async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.deleteOne({ _id: userId });
    res.status(200).send({ code: 236, message: "user deleted", deletedUser });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

// edit user info
router.patch("/admin/user/:userId", verify, async (req, res) => {
  try {
    const { userId } = req.params;
    const { role, name, email } = req.body;
    const updatedUser = await User.updateOne(
      { _id: userId },
      { $set: { role, name, email } }
    );
    res.status(200).send({ code: 200, updatedUser });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

module.exports = router;
