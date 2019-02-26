// this file is responsible for creating our Commnent collection
const mongoose = require("mongoose");

// based off week 18 activity 20
// save a reference to the mongoose Schema constructor
const Schema = mongoose.Schema;

// using the Schema constructor, we will create a new UserSchema object
const CommentSchema = new Schema({
    // title is a string type
    title: String,
    // body is a string stype
    body: String
});

// This creates our model from the above schema, using mongoose's model method
// mongoose.model("modelName", schema)
const Comment = mongoose.model("Comment", CommentSchema);

// export our Comment model
module.exports = Comment;
