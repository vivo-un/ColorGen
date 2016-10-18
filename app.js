var express = require('express');
var app = express();
var fs = require('fs');
var fileUpload = require('express-fileupload');
var db = require('./dbConfig.js');

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

app.post('/colors', function(req, res) {
  console.log('tried to post!');
  savedColors = new db.colors ({
    filepath: req.body.filepath,
    colorChange: req.body.colorChange,
    name:req.body.name
    }).then(function(model, err){
      console.log('added ', req.body.name, ' to the db!');
      res.end();
    });
  });
});
  // var target = path.resolve('/.uploads/image.jpg');
  // fs.rename(temp, target, function(err){
  //   if(err){
  //     console.log(err);
  //   } else {
  //     console.log('uploaded!');
  //   }
  // });
// });

app.listen(process.env.PORT || 5000, function(){
  console.log('listening on port PORT or 5000');
});