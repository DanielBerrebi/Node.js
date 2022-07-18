const mongoose = require("mongoose");
 
mongoose.connect('mongodb://localhost:27017/fruitsDB');
const fruitSchema = new mongoose.Schema ({
    name: {
        type:String,
        required:[true,"Please check your data entry, no name specified"]
    },
    rating: {
        type:Number,
        min:[1,"You are overreacting, 0 is not a valid rating go between 1-10"],
        max:[10,"It's a fruit not a pizza don't overreact rating go between 1-10 to fruits"]
    },
    review: String
  });
//mongoose will take name of the model that we are sending and will create a collection with the same string
// but as plural and also without capital letters in our case the collection will be fruits
//the second arg is the schema of the collection
const Fruit = mongoose.model("Fruit", fruitSchema);
 
const apple = new Fruit ({
  name: "Apple",
  rating: 7,
  review: "Pretty solid"
});
 
//the save function will add it to our collection
apple.save();

const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    favouriteFruit:fruitSchema
  });
  //it's will be the collection with the name people
  const Person = mongoose.model("Person", personSchema);
  const person = new Person ({
    name: "john",
    age: 43,
    favouriteFruit:apple
  });
person.save();

//   const kiwi=new Fruit ({
//     name: "Kiwi",
//     rating: 8,
//     review: "Once you get use to the taste you will love them"
//   }); 
//   const orange=new Fruit ({
//         name : "Orange",
//         score:6,
//         review: "It's very sour"
//     });
//     const banana=new Fruit({
//         name : "Banana",
//         score:10,
//         review: "The best fruit!!!!"
//     });
    // Fruit.insertMany([kiwi,orange,banana],function(err){
    //     if(err)
    //         console.log(err);
    //     else
    //         console.log("Great success!!!")
    // });
Fruit.find(function(err,fruits){
    if(err)
        console.log(err);
    else{
        mongoose.connection.close();
        fruits.forEach(function(fruit){
            console.log(fruit.name)
        })
    }
})
// Fruit.updateOne({_id:AAAAAAA},{name:"AAAAAA"},function (err){
//     if(err)
//         console.log(err);
//     else
//         console.log("Updated succefully")
// })
// Fruit.DeleteOne({name:"AAAAAA"},function (err){
//     if(err)
//         console.log(err);
//     else
//         console.log("Deleted succefully")
// })
// Person.deleteMany({name:"john"},function(err){
//     if(err)
//         console.log(err);
//     else
//         console.log("Deleted succefully")
// })
