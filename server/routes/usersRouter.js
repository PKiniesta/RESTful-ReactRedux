const express = require("express");
const usersController = require("../controllers/usersController.js");

function routes(User) {
  const usersRouter = express.Router();
  const controller = usersController(User);
  usersRouter
    .route("/users")
    .post(controller.post)
    .get(controller.get);

  usersRouter.route("/login").post(controller.postLogIn);

  return usersRouter;
}

module.exports = routes;
