const mongoose = require("mongoose")
const Comment = require("./comments.js")


//schema
const postSchema = new mongoose.Schema({
  name: {type:String, required: true},
  img: String,
  description: String,
  heart: Boolean,
  comments: [String]
})

const Post = mongoose.model("Post", postSchema)
module.exports = Post
