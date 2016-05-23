var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

app.use(bodyParser.json());

var verify_token = 'NBRMXSs3sO';
var token = 'EAADYeYqESZAEBABNZBtUkkgGmrFdFMwJXx7rDhKYblHLRRualIXrEZAbMvoTpw6lxgFWxdH5kFJ1cf409xyoulL1CbLQt63ezTSofslMjo46cyOM2HbCalGfYqgmKVn9TJY6zLl5x61Yf9rTiul7kOdfyvAX3s9vWQBFYGVHQZDZD';

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
  console.log('hello world');
});

app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === verify_token) {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

app.post('/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging;

  for (i = 0; i < messaging_events.length; i++) {
    var event = req.body.entry[0].messaging[i];
    var sender = event.sender.id;
    
    if (event.message && event.message.text) {

      var text = event.message.text;
      var ingredientsArray = text.split(", ");
      // Handle a text message from this sender
    
    

      if (text.toLowerCase() === 'hello') {
        sendTextMessage(sender, "Hi there!");
        
      } else if (text.toLowerCase() === 'goodbye') {
        sendTextMessage(sender, "See you later!");

      } else if (text.toLowerCase() === 'help') {
        sendTextMessage(sender, "Dom is teaching me how to help you. Sit tight!");

      } else {
        sendTextMessage(sender, "This should be the first ingredient: " + ingredientsArray[0]);
      }
    // End of message handler
    }

  }
  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000);




function sendTextMessage(sender, text) {

    var messageData = {
        text: text
    };

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: token},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData
        }
    }, function (error, response) {

        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }

    });

}