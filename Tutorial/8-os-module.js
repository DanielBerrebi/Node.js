const os= require('os')
//os function for this version can be found here --> https://nodejs.org/dist/latest-v16.x/docs/api/os.html
//info about current user
const user=os.userInfo()
console.log(user)

//method that returns the system uptime
console.log(`The system uptime is ${os.uptime()}`)

const correntOS= {
    name:os.type(),
    release:os.release(),
    totalMem:os.totalmem(),
    freeMem:os.freemem(),
}
console.log(correntOS)
