// import our scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

// Require our models/collections
const db = require("../models");

// export our routes to be used by the server
module.exports = function (app) {
    // our GET route for scraping the thrasher website
    // based off week 18 activity 20
    app.get("/scrape", (req, res) => {
        // grab the html body with axios
        axios.get("http://www.thrashermagazine.com/").then((response) => {
            // we load the response into cheerio and save it to $ for a shorthand selector
            const $ = cheerio.load(response.data);

            // next, we grab every li with class post-list-item
            $("li.post-list-item").each((i, element) => {
                // empty result object for later use
                let result = {};

                // add the headline, description, url and photo and save them as properties of the result object
                result.title = $(element).children("h4").text();
                result.description = $(element).children("div.post-description").text();
                result.link = $(element).children("div.social-container").children("div").attr("data-url");
                result.image = $(element).children("div.post-thumb-container").children("a").children("img").attr("src");
                // the img tag does not include the domain name, so we add it manually using a template literal
                result.image = `http://www.thrashermagazine.com${result.image}`;

                // now create a new Article using the result object above
                db.Article.create(result).then((dbArticle) => {
                    // log the added result
                    console.log(dbArticle);
                }).catch((err) => {
                    // if an error occurs, log it
                    console.log(err);
                });
            });

            res.send("Scraping complete, let's proceed!");
        });
    });

    // route for getting all articles from the db
    app.get("/all", (req, res) => {
        // grab all the articles in the Article collection
        db.Article.find({}).then((dbArticle) => {
            // if articles were successfully found, send these to the client
            res.json(dbArticle);
        }).catch((err) => {
            // if an error occurs, then also let the client know
            res.json(err);
        })
    });

    // route for creating/updating an Article's associated Comment
    app.post("/articles/:id", (req, res) => {
        db.Comment.create(req.body).then((dbComment) => {
            // if a comment gets created successfully, find the Article with an _id equal to req.params.id. Then, update this Article to be associated with the new Comment
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another .then which receives the result of the query
            // modeled after week 18 activity 20 server.js file
            // took $push from week 18 activity 19, it allows multiple items to be pushed into the comment array in the Article collection without overwriting the previous one
            return db.Article.findOneAndUpdate(
                { _id: req.params.id },
                {$push: { comment: dbComment._id }},
                { new: true }
            );
            // db.Article.comment.push()
        }).then((dbArticle) => {
            // if the update on the article was successful, then show it to the client side
            res.json(dbArticle);
        }).catch((err) => {
            // if an error occurs, show it to the client side
            res.json(err);
        });
    });

    // route for retrieving a specific Article by ID and populate it with its comments
    app.get("/articles/:id", (req, res) =>{
        // using req.params.id, find the matching Article in our DB
        db.Article.findById(
            {_id: req.params.id}
        )
        // and populate all the comments linked to it
        .populate("comment").then((dbArticle)=>{
            // if the query to find an Article with the given ID is successful, then send this back to the client side
            res.json(dbArticle);
        }).catch((err)=>{
            // or if an error occurs, send it to the client side as well
            res.json(err);
        });
    });

    // route for deleting an Article's associated comment by ID
    app.delete("/comments/:id", (req, res) => {
        db.Comment.findByIdAndDelete(
            {_id: req.params.id}
        ).then((dbComment)=>{
            // console.log(res);
            console.log(dbComment);
            res.send("delete successful!")
        }).catch((err)=>{
            res.json(err);
        });
    });

};
