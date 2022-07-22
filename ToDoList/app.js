const express=require('express');
const bodyParser=require('body-parser');
const mongoose= require("mongoose");
const _=require("lodash");
const app=express();



app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

mongoose.connect("mongodb+srv://admin-daniel:Test123@cluster0.vc9co.mongodb.net/todolistDB")
app.set('view engine', 'ejs');
const ItemSchema={
    name:String
};
const Item= mongoose.model("Item",ItemSchema);

const item1=new Item({
    name:"Welcome to yout todolist!"
});
const item2=new Item({
    name:"Hit the + button to add a new item."
});
const item3=new Item({
    name:"<-- Hit this to delete an item"
});


const defaultItems=[item1,item2,item3];
const listSchema={
    name:String,
    items:[ItemSchema]
}
const List=mongoose.model("List",listSchema)

app.get("/",function(req,res){

    Item.find({},function(err,foundItems){
        if(err)
            console.log(err);
        else
        {
            if(foundItems.length===0){
                Item.insertMany(defaultItems,function(err){
                    if(err)
                        console.log(err);
                    else
                        console.log("The default items was succefully saved to the DB");
                })
                res.redirect("/");
            }else
                res.render("List",{listTitle:"Today",NewItems:foundItems})
        }   
    })
});

app.get("/:category",function(req,res){
    const customCategory=_.capitalize(req.params.category);

    List.findOne({name:customCategory},function(err,result){
        if(err)
            console.log(err)
        else{
            if(!result){
                const list=new List({
                    name:customCategory,
                    items:defaultItems
                })
                list.save();
                res.redirect("/"+customCategory)
            }
            else{
                res.render("List",{listTitle:result.name,NewItems:result.items});
            }
        }
    })

});
app.post("/",function(req,res){
    const listName=req.body.list;
    const item=new Item({
        name:req.body.newItem
    })
    if(listName==="Today"){
        item.save();
        res.redirect("/");
    }else{
        List.findOne({name:listName},function(err,list){
            if(err)
                console.log(err)
            list.items.push(item);
            list.save();
            res.redirect("/"+listName);
        })
    }

});
app.post("/delete",function(req,res){
    const listName=req.body.listName;
    const itemName=req.body.checkbox
    if(listName==="Today"){
        Item.findByIdAndRemove(itemName,function(err){
            if(err)
                console.log(err)
            else
                res.redirect("/");
        })
    }else{
        List.findOneAndUpdate({name:listName},{$pull:{items:{_id:itemName}}},function(err,list){
            if(err)
            console.log(err)
        else
            res.redirect("/"+listName);
        })
    }
    
});
app.get("/about",function(req,res){
    res.render("about")
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
 
app.listen(port, function() {
  console.log("Server started succesfully");
}); 