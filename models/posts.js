const mongoose = require("mongoose")
const Comment = require("./comments.js")


//schema
const postSchema = new mongoose.Schema({
  name: {type:String, required: true},
  img: {type:String, required: true},
  description: String,
  heart: Number,
  comments: [String]
})

const Post = mongoose.model("Post", postSchema)
module.exports = Post
