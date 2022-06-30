//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Blogging allows you to share information about your business and its services but it also allows you to share opinions and thoughts on certain topics.  Blogging is a great way to create a personality for your company and makes your business more credible approachable. So, don’t be afraid to share your interests on your blogs, comment on timely news topics or market trends or educate your readers on a particular topic. Always be sure you write blogs with your audience in mind.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
let posts=[];

app.get("/",function(req,res){
  res.render("home",
  {
    startingContent:homeStartingContent,
    posts:posts
  });
  
});

app.get("/posts/:topic",function(req,res){
  let name=_.lowerCase(req.params.topic);
  posts.forEach(function(post) {
    if(_.lowerCase(post.text)==name)
    {
      res.render("post",{heading:post.text,content:post.content});
    }
  });
});

app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  const post={
    text:req.body.posttitle,
    content:req.body.content
  };
  posts.push(post);
  res.redirect("/");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
