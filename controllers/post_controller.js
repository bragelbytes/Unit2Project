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

//Heart UPDATE
router.put("/:id/heart", (req,res) => {

  if(req.body.heart === 0){
    req.body.heart = req.body.heartThis + 1;
    Post.findByIdAndUpdate(req.params.id, req.body, {new:true},
      (error, updatePosts) => {
        res.redirect("/posts/" + req.params.id)
      })
  } else {
    req.body.heart = req.body.heartThis - 1;
    Post.findByIdAndUpdate(req.params.id, req.body, {new:true},
      (error, updatePosts) => {
        res.redirect("/posts/" + req.params.id)
      })
  }

})


//INDEX
router.get('/' , isAuthenticated, (req, res) => {
  Post.find({}, (error, allPosts) => {
    res.render(
      "index.ejs",
      {
        posts: allPosts,
        currentUser: req.session.currentUser
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
        heart: 0,
        comments: []
      },
      {
        name: "The Last of Us 2",
        img: "https://i.imgur.com/GfsybDL.jpg",
        description: "Whale of a time",
        heart: 0,
        comments: []
      },
      {
        name: "Control",
        img: "https://i.imgur.com/xQ56qtK.jpg",
        description: "Dank office.",
        heart: 0,
        comments: []
      },
      {
        name: "Control",
        img: "https://i.imgur.com/6QQn84D.jpg",
        description: "It's time.",
        heart: 0,
        comments: []
      },
      {
        name: "Ghost of Tsushima",
        img: "https://i.imgur.com/4WKTXHM.jpg",
        description: "Flowers and fog.",
        heart: 0,
        comments: []
      },
      {
        name: "Control",
        img: "https://i.imgur.com/WGOfbbb.jpg",
        description: "A moment of respite.",
        heart: 0,
        comments: []
      },
      {
        name: "The Last of Us 2",
        img: "https://i.imgur.com/B5AJA4g.jpg",
        description: "Rainbow road.",
        heart: 0,
        comments: []
      },
      {
        name: "The Last of Us 2",
        img: "https://i.imgur.com/RmGHmLh.jpg",
        description: "Octodad",
        heart: 0,
        comments: []
      },
      {
        name: "The Last of Us 2",
        img: "https://i.imgur.com/R46TifV.jpg",
        description: "Lunch break",
        heart: 0,
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
