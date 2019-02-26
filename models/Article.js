// this file will be responsible for creating our Article collection
const mongoose = require("mongoose");

// based off week 18 activity 20
// save a reference to the Schema constructor
const Schema = mongoose.Schema;

// using the Schema constructor, we will create a new UserSchema object
const ArticleSchema = new Schema({
    // title is a type string and is required
    title: {
        type: String,
        required: true
    },
    // description is a type string and also required
    description: {
        type: String,
        required: true
    },
    // link is a type string and also required
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }

});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// now we export the Article model
module.exports = Article;