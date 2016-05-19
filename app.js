var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
  console.log('hello world');
});

app.listen(process.env.PORT || 3000);