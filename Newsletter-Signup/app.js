const express=require('express');
const { response } = require("express");
const bodyParser=require('body-parser');
const mailchimp  = require("@mailchimp/mailchimp_marketing");

const app=express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))


app.get("/",function(req,res){
  res.sendFile(__dirname +"/signup.html");  
});
mailchimp.setConfig({
  apiKey: "daa48819254fecc780d1560c6d01aaa4",
    server: "us8"
});

app.post('/',function(req,res){
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email; 
    const listId = 'ea279ba6e7';
    const subscribingUser = {firstName: fname, lastName: lname, email: email}
    const run = async () => {
      const response = await mailchimp.lists.batchListMembers(listId, {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fname,
                LNAME: lname
            }
        }],
      })
    }
    res.sendFile(__dirname+"/failure.html");
try{
  run();
  }
    catch{
      res.sendFile(__dirname+"/failure.html");
      console.log('Error')
    }


});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(3000,function(){
    console.log("server is running on port 3000")
})