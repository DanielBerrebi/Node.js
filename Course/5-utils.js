const sayHi= (name)=>{
    console.log(`Hello there ${name}`);
}
//this way is for only one function 
module.exports = sayHi;
//this way is for multiple functions
//module.exports = {sayHi};