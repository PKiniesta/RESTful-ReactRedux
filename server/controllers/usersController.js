const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const BCRYPT_SALT = 10;

function usersController(User) {
  async function post(req, res) {
    try {
      if (!req.body.login) {
        res.status(400);
        return res.send("Login is required");
      }
      if (!req.body.password) {
        res.status(400);
        return res.send("Password is required");
      }

      req.body.password = bcrypt.hashSync(req.body.password, BCRYPT_SALT);
      const user = new User(req.body);
      const result = await user.save();
      res.status(201);
      return res.json(result);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  function get(req, res) {
    User.find((err, users) => {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  }

  async function postLogIn(req, res) {
    try {
      const user = await User.findOne({ login: req.body.login }).exec();
      if (!user) {
        return res.status(401).send({ login: "Username does not exsist" });
      }
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).send({ password: "Password not valid" });
      }
      console.log(config.jwtSecret);
      const token = jwt.sign(
        {
          id: user.get("_id"),
          login: user.get("login")
        },
        config.jwtSecret
      );
      res.send({ token });
    } catch (err) {
      res.status(500).send(err);
    }
  }

  return { post, get, postLogIn };
}

module.exports = usersController;
