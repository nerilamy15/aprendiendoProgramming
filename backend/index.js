const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");




//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false}));



//import routes
const authRoute = require("./routes/auth");
const adminRoute = require("./routes/admin");
const userRoute = require("./routes/userInfo");
const privateRoute = require("./routes/private");




dotenv.config();

//connect to the db
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true},() => console.log("connected to the DB"));


//route middlewares
 app.use("/", authRoute);
 app.use("/", privateRoute);
 app.use("/", userRoute);
 app.use("/", adminRoute);

app.listen(PORT, () => console.log(`server is up and running on port ${PORT}`));
