const express = require("express");
const authorsController = require("../controllers/authorsController");
const authenticate = require("../middleware/authorization");

function routes(Author) {
  const authorRouter = express.Router();
  const controller = authorsController(Author);
  authorRouter
    .route("/authors")
    .post(authenticate, controller.post)
    .get(controller.get);

  authorRouter.use("/authors/:authorId", (req, res, next) => {
    Author.findById(req.params.authorId, (err, author) => {
      if (err) {
        return res.send(err);
      }
      if (author) {
        req.author = author;
        return next();
      }
      return res.sendStatus(404);
    });
  });

  authorRouter
    .route("/authors/:authorIdId")
    .get(controller.getById)
    .delete(authenticate, controller.del);

  return authorRouter;
}

module.exports = routes;
