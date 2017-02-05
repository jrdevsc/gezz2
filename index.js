//stuff for app
var accountSid = 'AC16edb347fa421e6fb5f65078128f2a49';
var authToken = 'e8779953051872673c8693a98c08ae25';

var express = require('express');
var app = express();
var client = require('twilio')(accountSid, authToken);
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  console.log(req.body);
  res.render('index');
});

app.get('/form', function(req, res){
  res.render('form');
});

app.post('/form', function(req, res){
  var myMachine = req.body.myMachine;
  var myPart = req.body.myPart;
  var myMessage = req.body.myMessage;

  var mBody = `${myMachine} Needs: ${myPart}. ${myMessage}`;

  client.messages.create({
    to: "+18643540962",
    from: "+18645680958",
    body: mBody,
  }, function(err, message){
    console.log(message.sid);
  });

  res.redirect('/form');


});

var port = process.env.PORT || 8080;

app.listen($PORT, function(){
  console.log("Server Started...");
});
