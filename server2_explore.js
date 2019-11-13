const port = process.env.PORT || 8080
const express = require('express')
// const handlebars = require('express-handlebars')
const path = require('path')
var app = express()
// router = express.Router()
// app.engine('handlebars', handlebars());
// app.set('view engine', 'handlebars');

var logger = require('morgan')
app.use(logger('combined'))
var cookieParser = require('cookie-parser');
app.use(cookieParser())
var bodyParser = require('body-parser');

app.use(express.static("served"))               //   kein '/' hier …
app.use("/script",express.static("script")) 


app.get("/", function(req, res){
    
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)
    
    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)

    res.send("Hallo")
})

var url_history = []

app.get(/\/explore_req|\/explore_req\/.*/,   make_handler("req") )


function make_handler(o_to_explore) {
    
    return the_explorer
}






function the_explorer(req,res){
    
    var aaa = req.url
    var aaai = url_history.indexOf(aaa)
    if (aaai > -1) url_history.splice(aaai,1)
    url_history.unshift(aaa)
    
    
    var object_path = aaa.split("/")        // eine führender "/" produziert hier ein leeres, erstes Element im Array…
    object_path.shift()                     // … wird hier entsorgt.
    if (object_path[object_path.length - 1] === "") object_path.pop()   // falls die URL auf "/" endete, muss auch das letzte 
                                                                        // Element entsorgt werden.
    
    var h1_str = ""
    var path=[]
    for (var i = 0; i < object_path.length; i++) {
        path.push(object_path[i])
        h1_str += "/<a href='/" + path.join("/") + "'>" + object_path[i] + "</a>"
    }
    var str = "<h1 id='objectpath'>" + h1_str + "</h1>"
    
    str = str + "<div id='historydisplay'><textarea id='urlhistory'>" +  url_history.join("\n")  +  "</textarea><button id='copy_to_clipboard'>Copy</button><button id='clear_history'>Clear History</button></div>"
    
    str += "<br><br><br><br><br>"
    
    // Set "leftist" object in object_path auf req and shift on …
    object_path.shift()
    var obj = req  
    
    function get_last_obj (a) {
        
        if (a.length > 1) { 
            var aaa = a.shift()
            obj = obj[aaa]
            get_last_obj(a)
        } else if (a.length === 1) {
            obj = obj[a[0]]
        }
    }
    console.log(object_path)
    get_last_obj(object_path)
    
    
    
    var span = "<div class='div_or_span'>"
    var span_ = "</div>"
    if (typeof obj === 'object') {
        for (var i in obj) {
            
            //var i_link = "<a href='" +  i  +  "'>" + i + "</a>"      // ????????????????????????
            var i_link = "<a href='" +  req.url + "/" +  i  +  "'>" + i + "</a>"     
            
            if ( obj[i] && obj[i].toString) {
                str = str + i_link + ": " + span + obj[i] + span_ + "<br>"
            } else {
                str = str + i_link + ": " + span + "----------" + span_ + "<br>"
            }
        }
    
    } else {
        str = str + span + obj + span_ + "<br>"
    }
    
    res.send(template1(req.url) + str + close_template())
}

app.listen(port, function(){
    
    console.log(`http://localhost:${port}      http://localhost:${port}/produce_GET_POST_AJAX.html      `)
    console.log(`http://localhost:${port}/explore_req   `)
    
})




function template1(title){
var a=`<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>${title}</title>
	<style>
		div, p { color: #333333; margin: 3px;	}
		h1#objectpath {box-sizing:border-box;position:fixed;top:0px;left:0px;width:70%;background-color:white;padding:14px 14px 14px 14px;margin:0px;}
		div#historydisplay {box-sizing:border-box;position:fixed;top:0px;right:0px;height:450px;width:30%;}
		textarea#urlhistory {background-color:white;padding:10px;width:90%;height:90%;word-break:keep-all;border:1px solid black;border-radius:10px;overflow:auto;}
		.div_or_span {display:inline-block;width:600px;max-height:80px;border:1px solid black; overflow-y: scroll;}
        </style>
	<script type = "text/javascript" 
	 src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js">
	</script>
	<script src="/script/server2_client.js">
	</script>
</head>
<body>`
return a    
}

function close_template(){
var a=`</body>
</html>`
return a
}

