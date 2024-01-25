const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");

//We have to Require the Database Collections File
const Register = require("./src/Modals/collection");

const checkValidToken = require("./src/middleware/auth");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: false }));

app.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    //Here we have to check the enter mail and password is present or not
    // const data = await Register.findOne({ email: req.body.email,phone:req.body.phone });
    const data = Register.find({
      $or: [{ email: req.body.email, phone: req.body.phone }],
    });
    console.log(data?.email);
    if (data?._id === "undefined") {
      return res
        .status(400)
        .json({ message: "Account already exist, please login" });
    }
    const hashedPassword = await bcrypt.hash(req.body.passWord, 12);

    const signUP = await Register.create({
      userName: req.body.userName,
      email: req.body.email,
      phone: req.body.phone,
      passWord: hashedPassword,
    });
    //JWT generate for registartiom
    let token;
    try {
      token = jwt.sign(
        {
          id: signUP._id,
          email: signUP.email,
          userName: signUP.userName,
          phone: signUP.phone,
        },
        "mynameischinmayanimalpurinodedeveloper",
        { expiresIn: "900s" }
      );
      console.log(token);
    } catch (error) {
      return res.status(400).json(error.message);
    }

    res.json({ username: signUP.userName, email: signUP.email, token });
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    email = req.body.email;
    passWord = req.body.passWord;

    //Here we have to check the enter mail and password is present or not
    const data = await Register.findOne({ email: email });

    if (!data) {
      console.log("data not found");
      return res
        .status(400)
        .json({ message: "Account doesn't exist please register" });
    }
    // Using Bcrypt npm package method

    const isMatch = await bcrypt.compare(passWord, data.passWord);
    let token;
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password/Email" });
    } else {
      try {
        token = jwt.sign(
          {
            id: data._id,
            email: data.email,
            userName: data.userName,
            phone: data.phone,
          },
          "mynameischinmayanimalpurinodedeveloper",
          { expiresIn: "900s" }
        );
      } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
      }
    }
    res.json({ username: data.userName, email: data.email, token });
  } catch (error) {
    res.status(400).send("invalid Login Details.....!");
  }
});

mongoose
  .connect("mongodb://127.0.0.1:27017/register", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => console.log(`app listening on port ${port}!`));
  })
  .catch((error) => console.log(error));
