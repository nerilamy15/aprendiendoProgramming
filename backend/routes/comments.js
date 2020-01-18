const router = require("express").Router();
const verify = require("./verifyToken");
const Comment = require("../schemas/comment");

// get all comments

router.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.status(200).send({ code: 252, comments });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

// create a comment

router.post("/post/:postId/comments", verify, async (req, res) => {
  const { surName, comment, avatar, id } = req.body;
  const data = new Comment({
    name: surName,
    comment,
    avatar,
    id
  });

  try {
    const savedComment = await data.save();
    res.status(210).send({ code: 251, message: "commented!", savedComment });
  } catch (err) {
    res.status(500).send({ code: 499, message: "failed to comment!" });
  }
});

module.exports = router;
