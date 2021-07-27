const mongoose = require("mongoose")

//schema
const postSchema = new mongoose.Schema({
  name: {type:String, required: true},
  img: String,
  description: String,
  heart: Boolean
})

const Post = mongoose.model("Post", postSchema)
module.exports = Post
