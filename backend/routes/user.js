//user
const router = require("express").Router();
const User = require("../schemas/user");
const verify = require("./verifyToken");
const path = require("path");
const os = require("os");
const fs = require("fs");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
let multer = require("multer");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// multer things
let myStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

let upload = multer({
  storage: myStorage
});

router.post("/uploadFile", upload.single("avatar"), async (req, res, next) => {
  // res.send(req.file);
  const file = req.file.path;

  try {
    const result = await cloudinary.uploader.upload(
      file,
      { folder: "profilePics" },
      (err, result) => {
        console.log(result);
      }
    );
  } catch (err) {
    console.log(err);
  }
});

// edit profile
router.put("/user/:userId", verify, async (req, res) => {
  try {
    const { userId } = req.params;
    const userName = req.body.editedUserName;
    const email = req.body.editedEmail;

    const updatedProfile = await User.updateOne(
      { _id: userId },
      { $set: { userName, email } }
    );
    const user = await User.findById(userId);
    res.status(200).send({ code: 233, user });
  } catch (err) {
    res.status(400).send({ code: 500 });
  }
});

//edit image profile
router.patch(
  "/user/:userId/profile/updateAvatar",
  upload.single("avatar"),
  async (req, res) => {
    try {
      //const { avatar } = req.file.path;
      let img = fs.readFileSync(req.file.path);
      let encode_img = img.toString("base64");
      let finalImage = {
        contentType: req.file.mimetype,
        //path: req.file.path,
        image: new Buffer.from(encode_img, "base64")
      };
      //const avatar = req.file.filename;

      const { id } = req.params;

      const updatedAvatar = await User.updateOne(
        { _id: id },
        { $set: { avatar: finalImage } }
      );
      console.log(finalImage);
      res.status(200).send({ code: 255, message: "avatar updated!" });
    } catch (err) {
      res.status(400).send({ error: err, message: "fail to update avatar" });
    }
  }
);
module.exports = router;
