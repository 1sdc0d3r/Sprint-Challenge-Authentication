const jwt = require("jsonwebtoken");
const secret = "thisIsASprint";

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    jwt.verify(authorization, secret, (err, decodedToken) => {
      if (err) {
        res
          .status(400)
          .json({ message: "Token could not be verified", error: err });
      } else {
        console.log(JSON.stringify("decodedToken", decodedToken));
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
};
