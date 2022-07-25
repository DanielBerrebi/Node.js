const express=require('express');
const bodyParser=require('body-parser');
const mongoose= require("mongoose");
const app=express();



app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

//mongoose.connect("mongodb+srv://admin-daniel:Test123@cluster0.vc9co.mongodb.net/wikiDB")
mongoose.connect("mongodb://localhost:27017/wikiDB")
app.set('view engine', 'ejs');
const ArticleSchema={
    title:String,
    content:String
};
const Article= mongoose.model("Article",ArticleSchema);

app.route("/articles").get(function(req,res){
    Article.find(function(err,results){
        if(err)
            res.send(err)
        else
            res.send(results);
    })
})
.post(function(req,res){
    const newArticle= new Article({
        title:req.body.title,
        content:req.body.content
    });
    newArticle.save(function(err){
        if(err)
            res.send(err)
        else
            res.send("Succesfully added the new article")
    });
})
.delete(function(req,res){
    Article.deleteMany(function(err){
        if(err)
            res.send(err)
        else
            res.send("all the articles been deleted succesfully")
    });
})

app.route("/articles/:articleTitle").get(function(req,res){
    const articleTitle = req.params.articleTitle
    Article.findOne({title:articleTitle},function(err,result){
        if(err)
            res.send(err)
        else if(!result)
            res.send(`No article with the title name of ${articleTitle} was found`)
            else
                res.send(result)

    })
})

.put(function(req,res){
    Article.replaceOne(
        {title:req.params.articleTitle},
        {title:req.body.title,content:req.body.content},{overwrite:true},function(err,result){
        if(err)
            res.send(err)
        else 
            res.send("Updated successfully")

    })
})
.patch(function(req,res){
    
    Article.updateOne(
        {title:req.params.articleTitle},
        {$set: req.body},function(err,result){
        if(err)
            res.send(err)
        else 
            res.send("Updated successfully")

    })
})
.delete(function(req,res){
    
    Article.deleteOne(
        {title:req.params.articleTitle},function(err,result){
        if(err)
            res.send(err)
        else 
            res.send(`the article ${req.params.articleTitle} was deleted successfully`)
    })
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
 
app.listen(port, function() {
  console.log("Server started succesfully");
}); 