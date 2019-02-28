// this page will be designated for our html routes only

// html routes
module.exports = function (app) {
    // our home page route aka landing page
    app.get("/", (req, res) => {
        res.render("index");
    });
};