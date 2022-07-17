const express=require('express');
const bodyParser=require('body-parser');
const date=require(__dirname+"/date.js")

const app=express();

const items=["Drink coffee","Work on your programming skills","Get stuck","Go to Stackoverflow"
,"Cock food","Eat food"];
const workItems=[];

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set('view engine', 'ejs');

app.get("/",function(req,res){
    res.render("List",{listTitle:date.getDate(),NewItems:items})
});

app.get("/work",function(req,res){
    res.render("List",{listTitle:"Work List",NewItems:workItems})
});
app.post("/",function(req,res){
    var item=req.body.newItem;
    if (req.body.list==="Work List")
    {
        workItems.push(item);
        res.redirect("/work");
    }
    else
    {
        items.push(item);
        res.redirect("/");
    }
});
app.get("/about",function(req,res){
    res.render("about")
});
app.listen(3000,function(){
    console.log("server is running on port 3000")
})
