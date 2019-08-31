function authorsController(Author) {
        function post(req, res) {
                const author = new Author(req.body);
                if (!req.body.name) {
                        res.status(400);
                        return res.send('Name is required!');
                }
                author.save();
                res.status(201);
                return res.json(author);
        }
        function get(req, res) {
                Author.find((err, authors) => {
                        if (err) {
                                return res.send(err);
                        }
                        return res.send(authors);
                });
        }

        function getById(req, res) {
                return res.json(req.author);
        }

        function del(req, res) {
                req.author.remove(err => {
                        if (err) {
                                return res.send(err);
                        }
                        return res.sendStatus(204);
                });
        }
        return { get, post, getById, del };
}

module.exports = authorsController;
