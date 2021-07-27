const express = require("express")
const router = express.Router()
const Post = require("../models/posts.js")

// Routes =========================== //

// DELETE(DESTROY)
router.delete("/:id", (req, res) => {
  Post.findByIdAndRemove(req.params.id, (error, deletePost) => {
    res.redirect("/posts")
  })
})

//PUT(UPDATE)
router.put("/:id", (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, {new:true},
  (error, updatePosts) => {
    res.redirect("/posts/")
  })
})

//EDIT
router.get("/:id/edit", (req, res) => {
  Post.findById(req.params.id, (error, editPosts) => {
    res.render(
      "edit.js",
      {
        post: editPosts
      }
    )
  })
})

//INDEX
router.get('/' , (req, res) => {
  Post.find({}, (error, allPosts) => {
    res.render(
      "index.ejs",
      {
        posts: allPosts
      }
    )
  })
});

//SEED
router.get("/seed", (req, res) => {
  Post.create(
    [
      {
        name: "Ghost of Tsushima",
        img: "https://i.imgur.com/4WKTXHM.jpg",
        description: "this is a photo of a video game",
        heart: true
      }
    ],
    (error, data) => {
      res.redirect("/posts")
    }
  )
})

//NEW
router.get("/new", (req, res) => {
  res.render("new.ejs")
})

//SHOW
router.get("/:id", (req, res) => {
  Post.findById(req.params.id, (error, showPosts) => {
    res.render(
      "show.ejs",
      {
        post: showPosts
      }
    )
  })
})

//POST(CREATE)
router.post("/", (req, res) => {
  Post.create(req.body, (error, createPost) => {
    res.redirect("/posts")
  })
})

module.exports = router
