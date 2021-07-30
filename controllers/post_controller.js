const express = require("express")
const router = express.Router()
const Post = require("../models/posts.js")

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

// Routes =========================== //

// DELETE(DESTROY)
router.delete("/:id", (req, res) => {
  Post.findByIdAndRemove(req.params.id, (error, deletePost) => {
    res.redirect("/posts")
  })
})

//EDIT
router.get("/:id/edit", (req, res) => {
  Post.findById(req.params.id, (error, editPosts) => {
    res.render(
      "edit.ejs",
      {
        post: editPosts
      }
    )
  })
})

//Rina helped me on this
router.put("/:id/comments", (req, res) => {
  Post.findById(req.params.id, (error, newComment) => {
    newComment.comments.push(req.body.comments)
    newComment.save(() => {
      res.redirect("/posts/" + req.params.id)
    })
  })
})

//PUT(UPDATE)
router.put("/:id", (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, {new:true},
  (error, updatePosts) => {
    res.redirect("/posts/")
  })
})




//INDEX
router.get('/' , isAuthenticated, (req, res) => {
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
        img: "https://i.imgur.com/EeplxiR.jpg",
        description: "Flower field",
        heart: true,
        comments: []
      },
      {
        name: "The Last of Us 2",
        img: "https://i.imgur.com/GfsybDL.jpg",
        description: "Whale of a time",
        heart: true,
        comments: []
      },
      {
        name: "Control",
        img: "https://i.imgur.com/xQ56qtK.jpg",
        description: "Dank office.",
        heart: true,
        comments: []
      },
      {
        name: "Control",
        img: "https://i.imgur.com/6QQn84D.jpg",
        description: "It's time.",
        heart: true,
        comments: []
      },
      {
        name: "Ghost of Tsushima",
        img: "https://i.imgur.com/4WKTXHM.jpg",
        description: "Flowers and fog.",
        heart: true,
        comments: []
      },
      {
        name: "Control",
        img: "https://i.imgur.com/WGOfbbb.jpg",
        description: "A moment of respite.",
        heart: true,
        comments: []
      },
      {
        name: "The Last of Us 2",
        img: "https://i.imgur.com/B5AJA4g.jpg",
        description: "Rainbow road.",
        heart: true,
        comments: []
      },
      {
        name: "The Last of Us 2",
        img: "https://i.imgur.com/RmGHmLh.jpg",
        description: "Octodad",
        heart: true,
        comments: []
      },
      {
        name: "The Last of Us 2",
        img: "https://i.imgur.com/R46TifV.jpg",
        description: "Lunch break",
        heart: true,
        comments: []
      },

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
        post: showPosts,
        currentUser: req.session.currentUser
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
