const jwt = require("jsonwebtoken");
const collection = require("../Modals/collection");

const checkValidToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyUser);
    next();

    const user = await collection.findOne({ _id: verifyUser._id });
    console.log(user.email);
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = checkValidToken;
