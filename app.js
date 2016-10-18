var express = require('express');
var app = express();
var fs = require('fs');
var fileUpload = require('express-fileupload');

app.use(express.static(__dirname+'/public'));
app.use(fileUpload());

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
      res.sendFile(__dirname+'/public/newImage.html');
    }
  });

  // var target = path.resolve('/.uploads/image.jpg');
  // fs.rename(temp, target, function(err){
  //   if(err){
  //     console.log(err);
  //   } else {
  //     console.log('uploaded!');
  //   }
  // });
});

app.listen(process.env.PORT || 5000, function(){
  console.log('listening on port PORT or 5000');
});