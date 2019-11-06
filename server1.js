const port = process.env.PORT || 8080
const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')

var app = express()


app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.use(express.static("served"))               //   kein '/' hier …


app.get("/", function(req, res){
    
    res.send("Hallo")
})


app.listen(port, function(){
    
    console.log(`http://localhost:${port}      http://localhost:${port}/test_server1.html      `)
    
})



