// this file will be responsible for creating our Article collection
const mongoose = require("mongoose");

// based off week 18 activity 20
// save a reference to the mongoose Schema constructor
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
    // image url is a type string and also required
    image: {
        type: String,
        required: true
    },
    // "comment" is an array that stores CommentIDs
    // The ref property links these ObjectIds to the Comment model
    // This allows us to populate the Article with all associated Comments
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]

});

// This creates our model from the above schema, using mongoose's model method
// mongoose.model("modelName", schema)
const Article = mongoose.model("Article", ArticleSchema);

// now we export the Article model
module.exports = Article;