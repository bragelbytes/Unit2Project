const bcrypt = require("bcrypt")
const express = require("express")
const sessions = express.Router()
const User = require("../models/users.js")
const Post = require("../models/posts.js")

sessions.get("/new", (req, res) => {
  res.render("sessions/new.ejs",
  {currentUser:req.session.currentUser})
})

sessions.post("/", (req, res) => {

  User.findOne({username: req.body.username}, (error, foundUser) => {
    if(error){
      console.log(error);
      res.send("database problems")
    } else if(!foundUser){
      res.send("<a href='/'>User not found, try again</a>")
    } else {
      if(bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.currentUser = foundUser
        res.redirect("/posts/")
      } else {
          res.send("<a href='/'>incorrect password</a>")
      }
    }
  })
})

sessions.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/posts")
  })
})

module.exports = sessions
