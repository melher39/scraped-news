// import our scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("../models");

// our GET route for scraping the thrasher website
// based off week 18 activity 20
app.get("/scrape", (req, res) => {
    // grab the html body with axios
    axios.get("http://www.thrashermagazine.com/").then((response) => {
        // we load the response into cheerio and save it to $ for a shorthand selector
        const $ = cheerio.load(response.data);

        // next, we grab every li with class post-list-item
        $("li .post-list-item").each( (i, element) => {
            // empty result object for later use
            let result = {};

            // add the headline, description, url and photo and save them as properties of the result object
        });
    });
});