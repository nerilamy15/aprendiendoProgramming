const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
//let upload = multer({ dest: "uploads/" });

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "./public/"));

//import routes
const authRoute = require("./routes/auth");
const adminRoute = require("./routes/admin");
const postRoute = require("./routes/posts");
const userRoute = require("./routes/user");
const commentRoute = require("./routes/comments");

dotenv.config();

//connect to the db
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to the DB")
);

//route middlewares
app.use("/", authRoute);
app.use("/", postRoute);
app.use("/", adminRoute);
app.use("/", userRoute);
app.use("/", commentRoute);

app.listen(PORT, () => console.log(`server is up and running on port ${PORT}`));
