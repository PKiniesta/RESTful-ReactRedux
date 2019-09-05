const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(" ")[1];
  }

  if (token) {
    jwt.verify(token, config.jwtSecret, err => {
      if (err) {
        res.status(401).json({ error: "Failed to authenticate" });
      } else {
        next();
      }
    });
  } else {
    console.log(authorizationHeader);
    res.status(403).json({
      error: "No token provided"
    });
  }
};
