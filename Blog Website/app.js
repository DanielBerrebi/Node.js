const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require('lodash');
const mongoose= require("mongoose");

const homeStartingContent = "Hello and welcome to my blog website, in this blog everyone can write a post, if you like you can write a new post just click on Compose on the nav bar. ";
const aboutContent = "Hello my name is Daniel Berrebi and I have a B.Sc in Computer Science, I'm very passionate about web development and programming in general.";
const contactContent = "Hi if you would like to reach up to me you can do this by email:Berrebidaniel1@gmail.com .";
const app = express();
mongoose.connect("mongodb+srv://admin-daniel:Test123@cluster0.vc9co.mongodb.net/blogDB")
app.set('view engine', 'ejs');

const postSchema={
  title:String,
  content:String
};
const Post= mongoose.model("Post",postSchema);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res) => {
  Post.find({}, function(err, posts){
    res.render("home", {
      content: homeStartingContent,
      postArray: posts
      });
  });
});
app.get('/about', (req, res) => {
  res.render('about',{content:aboutContent});
});
app.get('/contact', (req, res) => {
  res.render('contact',{content:contactContent});
});
app.get('/compose', (req, res) => {
  res.render('compose');
});
app.get('/posts/:postId', (req, res) => {
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });
});
app.post('/compose',(req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.post
  });
  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, function() {
  console.log("Server started successfully");
});
