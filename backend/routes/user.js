//user
const router = require("express").Router();
const User = require("../schemas/user");
const verify = require("./verifyToken");

// edit profile
router.patch("/user/:userId", verify, async (req, res) => {
  try {
    const { userId } = req.params;
    const name = req.body.editedName;
    const email = req.body.editedEmail;
    const updatedProfile = await User.updateOne(
      { _id: userId },
      { $set: { name, email } }
    );
    res.status(200).send({ code: 200, updatedProfile });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

module.exports = router;
