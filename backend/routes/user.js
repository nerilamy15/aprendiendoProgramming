//user
const router = require("express").Router();
const User = require("../schemas/user");
const verify = require("./verifyToken");

// edit profile
router.patch("/user/:userId", verify, async (req, res) => {
  try {
    const { userId } = req.params;
    const userName = req.body.editedUserName;
    const email = req.body.editedEmail;
    const updatedProfile = await User.updateOne(
      { _id: userId },
      { $set: { userName, email } }
    );
    const user = await User.findById(userId);
    res.status(200).send({ code: 270, user });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

module.exports = router;
