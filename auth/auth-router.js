const router = require("express").Router();
const db = require("../database/dbConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
  const user = req.body;
  // implement registration
  if (user.username && user.password) {
    user.password = bcrypt.hashSync(user.password, 8);
    const token = tokenGenerator(user);
    db("users")
      .insert(user)
      .then(([id]) => {
        res.status(200).json({
          user,
          message: `successfully created user with id ${id}`,
          token
        });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: "please provide username and password" });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  db("users")
    .where({ username, username })
    .first()
    .then(user => {
      if (user) {
        if ((user.username, user.password)) {
          if (bcrypt.compareSync(password, user.password)) {
            res.status(200).json({ message: "correct credentials" });
          } else {
            res.status(400).json({ message: "incorrect credentials" });
          }
        } else {
          res
            .status(400)
            .json({ errorMessage: "please provide username and password" });
        }
      } else {
        res.status(500).json({ errorMessage: "user not found" });
      }
    });
});

module.exports = router;

function tokenGenerator(user) {
  const payload = {
    username: user.username,
    password: user.password
  };
  const secret = "thisIsASprint";
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secret, options);
}
