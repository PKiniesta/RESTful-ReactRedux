function createSlug(value) {
        return value
                .replace(/[^a-z0-9_]+/gi, '-')
                .replace(/^-|-$/g, '')
                .toLowerCase();
}

function coursesController(Course) {
        function post(req, res) {
                const course = new Course(req.body);
                if (!req.body.title) {
                        res.status(400);
                        return res.send('Title is required!');
                }
                if (!req.body.category) {
                        res.status(400);
                        return res.send('Category is required!');
                }
                if (!req.body.authorId) {
                        res.status(400);
                        return res.send('Author is required!');
                }
                req.body.slug = createSlug(req.body.title);
                course.slug = req.body.slug;
                course.save();
                res.status(201);
                return res.json(course);
        }

        function get(req, res) {
                const query = {};
                if (req.query.title) {
                        query.title = req.query.title;
                }
                if (req.query.category) {
                        query.category = req.query.category;
                }
                Course.find(query, (err, courses) => {
                        if (err) {
                                res.send(err);
                        }
                        res.json(courses);
                });
        }

        function getById(req, res) {
                return res.json(req.course);
        }

        function put(req, res) {
                const { course } = req;
                course.title = req.body.title;
                course.category = req.body.category;
                course.authorId = req.body.authorId;
                course.slug = createSlug(req.body.title);
                req.course.save(err => {
                        if (err) {
                                return res.send(err);
                        }
                        return res.json(course);
                });
        }

        function patch(req, res) {
                const { course } = req;
                if (req.body._id) {
                        delete req.body._id;
                }
                Object.entries(req.body).forEach(item => {
                        const key = item[0];
                        const value = item[1];
                        course[key] = value;
                });
                req.course.save(err => {
                        if (err) {
                                res.send(err);
                        }
                        res.json(course);
                });
        }

        function del(req, res) {
                req.course.remove(err => {
                        if (err) {
                                return res.send(err);
                        }
                        return res.sendStatus(204);
                });
        }

        return { post, get, getById, put, patch, del };
}

module.exports = coursesController;
