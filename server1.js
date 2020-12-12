const port = process.env.PORT || 8080
const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')

var app = express()
router = express.Router()
var logger = require('morgan')
//var cookieParser = require('cookie-parser');
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
router.use(logger())
router.use(express.static(path.join(__dirname, 'public')))
router.use(function (req, res) {
    res.send('Hello')
})
app.use(express.static("served"))               //   kein '/' hier …
//app.use(express.static(path.join(__dirname, 'public')))
//app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
    console.log('Time: %d', Date.now())
    next()
})

app.use('/user/:id', function (req, res, next) {
    console.log('__________________________Request Type:', req.method)
    next()
})

app.use('/user/:id', function (req, res, next) {
    console.log('Request URL:', req.originalUrl)
    next()
}, function (req, res, next) {
    console.log('Request Type:', req.method)
    next()
})

app.get('/user/:id', function (req, res, next) {
    console.log('ID:', req.params.id)
    next()
}, function (req, res, next) {
    res.send('User Info')
})

function logOriginalUrl (req, res, next) {
    console.log('Request URL:', req.originalUrl)
    next()
}

function logMethod (req, res, next) {
    console.log('Request Type:', req.method)
    next()
}

var logStuff = [logOriginalUrl, logMethod]    

// trifft nicht '/some_middleware' und nicht '/some_middleware/'    :
app.get('/some_middleware/:id', logStuff, function (req, res, next) {     
    res.send('User Info')
})

app.get("/", function(req, res){
    
    res.send("Hallo")
})

app.get("/explore_req", function(req,res){    
    res.send(req)
    
})

app.listen(port, function(){    
    console.log(`http://localhost:${port}      http://localhost:${port}/produce_GET_POST_AJAX.html      `)
    console.log(`http://localhost:${port}/explore_req    http://localhost:${port}/user/3`)
    console.log(`http://localhost:${port}/some_middleware    `)
})



