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
app.get('/user/:name', (req, res) => {
  res.send('User Page')
  l('got called on /user/:name')
  l('name-Parameter: ' + req.params.name)
})

app.get('/user/:name/:team', (req, res) => {
  res.send('User Team Page')
  l('got called on /user/:name/:team')
  l('name-Parameter: ' + req.params.name + ' team-Parameter: ' + req.params.team)
})

app.get('/a', authorizeUsersAccess, (req, res) => {
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

function authorizeUsersAccess(req, res, next) {
  if (req.query.admin === 'true') {
      next()
  }
  else {    res.send('ERROR: You must be an admin')  }
}

app.listen(3000, () => console.log('Server Started'))
