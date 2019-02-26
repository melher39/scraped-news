// import our scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
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
                result.image =  `http://www.thrashermagazine.com${result.image}`;

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

}
