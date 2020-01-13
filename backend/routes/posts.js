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
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.status(200).send({ code: 236, posts });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

// GET OLDEST POSTS
router.get("/posts/oldest/asd", async (req, res) => {
  try {
    const posts = await Post.find().sort();
    res.status(200).send({ code: 237, posts });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

// POST BY MOST LIKES

router.get("/posts/mostLikes/asd", async (req, res) => {
  try {
    const posts = await Post.find().sort({ likes: -1 });
    res.status(200).send({ code: 238, posts });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

//LIKE
router.post("/posts/:postId/likes", verify, async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    post.likes = post.likes + 1;
    await post.save();
    res.status(200).send({ code: 239, post, message: "Like!" });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

//dislike
router.post("/posts/:postId/dislike", verify, async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    post.disLikes = post.disLikes + 1;
    await post.save();
    res.status(200).send({ code: 240, post, message: "SUCCESS" });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});
module.exports = router;
