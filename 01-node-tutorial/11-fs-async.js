const {readFile,writeFile}= require('fs');
//err and result are callbacks it's work like event listener
console.log('start')
readFile('./content/first.txt','utf8',(err,result)=>{
if(err){
    console.log(err)
    return
} 
const first=result;
    readFile('./content/second.txt','utf8',(err,result)=>{
    if(err){
        console.log(err)
        return
    } 
    const second=result;
    writeFile('./content/result-async.txt',
    `Here is the result : ${first}, ${second}`,
    { flag:'a'},(err,result)=>{
        if(err){
            console.log(err)
            return
        } 
        console.log('done with this task')
    })
    })
})
console.log('starting the next one')
//we can see by the log that before we finished we were open for next test and by this
//method a group of user can work at the same time without waiting for each one to finished
//running the full code