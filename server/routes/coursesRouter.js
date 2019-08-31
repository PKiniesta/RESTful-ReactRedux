const express = require('express');
const coursesController = require('../controllers/coursesController');

function routes(Course) {
        const coursesRouter = express.Router();
        const controller = coursesController(Course);
        coursesRouter
                .route('/courses')
                .post(controller.post)
                .get(controller.get);

        // middle
        coursesRouter.use('/courses/:courseId', (req, res, next) => {
                Course.findById(req.params.courseId, (err, course) => {
                        if (err) {
                                return res.send(err);
                        }
                        if (course) {
                                req.course = course;
                                return next();
                        }
                        return res.sendStatus(404);
                });
        });

        coursesRouter
                .route('/courses/:courseId')
                .get(controller.getById)
                .put(controller.put)
                .patch(controller.patch)
                .delete(controller.del);

        return coursesRouter;
}

module.exports = routes;
