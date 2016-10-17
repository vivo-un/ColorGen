var express = require('express');
var app = express();

app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname+'/public/index.html');
});

app.listen(process.env.PORT || 5000, function(){
  console.log('listening on port PORT or 5000');
});