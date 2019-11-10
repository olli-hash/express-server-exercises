const port = process.env.PORT || 8080
const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
var app = express()
// router = express.Router()
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

var logger = require('morgan')
app.use(logger('combined'))


var cookieParser = require('cookie-parser');
app.use(cookieParser())

var bodyParser = require('body-parser');

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



/*
function logOriginalUrl (req, res, next) {
    console.log('Request URL:', req.originalUrl)
    next()
}

function logMethod (req, res, next) {
    console.log('Request Type:', req.method)
    next()
}*/



app.get("/", function(req, res){
    
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)
    
    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)

    
    // const { a, b} = { a: "hey! ", b: "du!"      }
    
    res.send("Hallo" + a + b)
})


app.get(/\/explore_req|\/explore_req\/.*/, function(req,res){
    
    var str = "<h1>" + req.url + "</h1>"
    
    //str = str + "<h3>" + req.url.replace(/\//g, ".")  +  "</h3>"
    
    var object_path = req.url.split("/")
    
    object_path.shift()
    
    var obj = req
    
    for (var i = 0; i < object_path.length; i++) {
        
        if (obj[object_path[i]]) obj = obj[object_path[i]]
    }
    
    
    var span = "<span style='display:inline-block;width:600px;border:1px solid black;overflow:auto;'>"
    var span_ = "</span>"
    
    for (var i in req) {
        
        // href='explore_req' -VS- href='/explore_req' …
        
        var i_link = "<a href='/explore_req/" +  i  +  "'>" + i + "</a>"
        
        if ( req[i] && req[i].toString) {
            str = str + i_link + ": " + span + req[i] + span_ + "<br>"
        } else {
            str = str + i_link + ": " + span + "----------" + span_ + "<br>"
        }
    }
    
    res.send(str)
    //res.send(req)
    
    
})



app.listen(port, function(){
    
    console.log(`http://localhost:${port}      http://localhost:${port}/produce_GET_POST_AJAX.html      `)
    console.log(`http://localhost:${port}/explore_req    http://localhost:${port}/user/3`)
    console.log(`http://localhost:${port}/some_middleware    `)
    
})



