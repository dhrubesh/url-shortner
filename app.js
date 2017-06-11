const express = require('express')
var app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const shortUrl = require('./models/shortUrl')
app.use(bodyParser.json())
app.use(cors())

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })

mongoose.connect('mongodb://localhost/shortUrls')


app.get('/new/:urlToShorten(*)',function(req,res){
    var   urlToShorten  = req.params.urlToShorten ;
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
    var regex = expression ;
    if(regex.test(urlToShorten)===true){
        var short = Math.floor(Math.random()*100000).toString();
        
        var data = new shortUrl({
            originalUrl : urlToShorten,
            shorterUrl : short
        })
        
        data.save(err=>{
            if(err){
                return res.send('error in saving data')
            }
        })
        
        
        return res.json(data)
    }
        var data = new shortUrl({
            originalUrl : 'url To Shorten doesnt match',
            shorterUrl : 'invalid url'
        })
    
        return res.json(data)
    
})

app.get('/:urlToForward',function(req,res){
    
    var shorterUrl = req.params.urlToForward;

    shortUrl.findOne({'shorterUrl': shorterUrl},(err,data)=>{
        if(err) return res.send('error reading database');
        var re = new RegExp("^(http|https)://", "i");
        var strToCheck = data.originalUrl;
        if(re.test(strToCheck)){
            res.redirect(301,data.originalUrl);
        }else{
            res.redirect(301,'http://'+data.originalUrl)
        }
        
    })
})

app.use(express.static(__dirname+'/public'))

app.listen(8080, function () {
  console.log('listening on port 8080....')
})