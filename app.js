var express = require('express');
var app = express();
var fs = require('fs');
var fileUpload = require('express-fileupload');
var db = require('./dbConfig.js');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(__dirname+'/public'));
app.use(fileUpload());
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
  res.sendFile(__dirname+'/public/index.html');
});

app.get('/saved', function(req, res) {
  new db.colors({name:'*'})
    .fetchAll()
    .then(function(saved){
      if(!saved){
        console.log('nothing saved');
      } else {
        res.json(saved);
      }
    });
    // .fail(function(error) {
    //   console.log(error);
    // });
});


// app.get('/image.jpg', function(req, res) {
//   res.sendFile(__dirname+'./uploads/image.jpg');
// });

app.post('/upload', function(req, res) {
  console.log(req.files);
  var newUpload = req.files.file;
  newUpload.mv('./public/uploads/file.jpg', function(err) {
    if(err){
      console.log(err);
    } else {
      console.log('File uploaded!');
      // res.sendFile(__dirname+'/public/newImage.html');
    }
  });
});

app.post('/color', function(req, res) {
  // console.log(req);
  console.log('tried to post!');
  console.log(req.body);

  var savedColors = new db.colors ({
    filePath: req.body.filePath,
    colorChange: req.body.colorChange,
    name:req.body.name
    }).save();
  });

app.listen(process.env.PORT || 5000, function(){
  console.log('listening on port PORT or 5000');
});