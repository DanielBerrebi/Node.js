console.log('started a first task')
readFile('./content/first.txt','utf8',(err,result)=>{
if(err){
    console.log(err)
    return
}
console.log(result)
console.log('completed the first task')
})
console.log('starting next task')
