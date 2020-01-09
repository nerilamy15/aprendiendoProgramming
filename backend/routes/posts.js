const router = require("express").Router();
const verify = require("./verifyToken");
const Post = require("../schemas/post");

//CREATE POST
router.post("/createPost", verify, async (req, res) => {
  const { name, email, post } = req.body;
  const data = new Post({
    name,
    email,
    post
  });
  try {
    const savedPost = await data.save();
    res.status(200).send({ code: 201, message: "Post Created!", savedPost });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

// GET ONE POST
router.get("/posts/:postId", verify, async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    res.status(200).send({ code: 235, post });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

// GET ALL POSTS
router.get("/posts", verify, async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send({ code: 200, posts });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});
module.exports = router;
