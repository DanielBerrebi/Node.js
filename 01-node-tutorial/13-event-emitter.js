const EventEmitter=require('events');

const cunstomEmitter= new EventEmitter()

cunstomEmitter.on('response',(name,age)=>{
    console.log(`data recieved ${name} ${age}`)
})
cunstomEmitter.on('response',()=>{
    console.log(`even if event was listened to , we can still listen at a diffent event listener`)
})

cunstomEmitter.emit('response')
//if we emit before set the on the on will not react  
cunstomEmitter.emit('react')
cunstomEmitter.on('react',()=>{
    console.log(`I will not be printed`)
})

//we can pass argument on the emit

cunstomEmitter.emit('response','daniel',26)