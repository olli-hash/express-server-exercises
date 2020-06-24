const express = require('express')
const app = express()
//   ----------------------------------- TRYING ROUTES -----------------------------------------

// on any route, use...
app.use(loggingMiddleware)
l = console.log.bind(console)
app.get('/', (req, res) => {
  res.send('Home Page')
  l('got called on root ... Home Page')
})
app.get('/users', (req, res) => {
  res.send('Users Page')
  l('got called on /users ... Users Page')
})
app.get('/a', (req, res) => {
  res.send('got called on a')
  l('got called on a')
})
app.get('/b', (req, res) => {
  res.send('got called on b')
  l('got called on b')
})

app.get('/c', (req, res) => {
  res.send('got called on c')
  l('got called on c')
})

app.get('/d', (req, res) => {
  res.send('got called on d')
  l('got called on d')
})

app.get('/tellme', (req, res) => {
  res.send('got called on /tellme')
  l('got called on /tellme')
})

function loggingMiddleware(req, res, next) {
  console.log(`${new Date().toISOString()}: localhost:3000${req.originalUrl}`)
  next()
}

app.listen(3000, () => console.log('Server Started'))
