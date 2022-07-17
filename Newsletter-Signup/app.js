const express=require('express');
const request = require('request');
const bodyParser=require('body-parser');
const https= require('https')

const app=express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))


app.get("/",function(req,res){
  res.sendFile(__dirname +"/signup.html");  
});
app.post('/',function(req,res){
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email; 
    const data = {
      members:[
        {
          email_address:email,
          status:"subscribed",
          merge_fields:{
            FNAME:fname,
            LNAME:lname
          }
        }
      ]
    }
    const jsonData=JSON.stringify(data);
    const url="https://us8.api.mailchimp.com/3.0/lists/ea279ba6e7"
    const options={
      methods:"POST",
      auth:"Daniel:62800ea9499912f662f8945cdbabe5e2-us8"
    }
    const request=https.request(url,options,function(respone){
      respone.on("data",function(data){
        console.log(JSON.parse(data))
      })

    })
    request.write(jsonData)
    request.end();
  });

app.listen(3000,function(){
    console.log("server is running on port 3000")
})

//api key 62800ea9499912f662f8945cdbabe5e2-us8
// audience id ea279ba6e7