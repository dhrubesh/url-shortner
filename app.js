const express = require('express')
var app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

app.use(bodyParser.json())
app.use(cors())

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

app.get('/new/:urlToShorten(*)',function(req,res){
    var   urlToShorten  = req.params.urlToShorten ;
    console.log(urlToShorten)
    
    return res.json({urlToShorten})
})

app.use(express.static(__dirname+'/public'))

app.listen(8080, function () {
  console.log('listening on port 8080....')
})