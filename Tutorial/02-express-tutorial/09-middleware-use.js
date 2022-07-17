const express = require('express')
const app = express()
const logger = require('./logger')
const authorize = require('./authorize')
//  req => middleware => res

//app.use add a fuction to the gets in this case it's apply the logger function on all the app.get
//[] use to add multi-functions
app.use([logger, authorize])
//we can add a path parameter in the next case only items and products will call logger or even bigget path like /api/xyz/longpath 
//app.use('/api',logger)
// api/home/about/products
app.get('/', (req, res) => {
  res.send('Home')
})
app.get('/about', (req, res) => {
  res.send('About')
})
app.get('/api/products', (req, res) => {
  res.send('Products')
})
app.get('/api/items', (req, res) => {
  console.log(req.user)
  res.send('Items')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
