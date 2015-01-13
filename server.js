

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ca-test1');
var Bear = require('./app/models/bear');

var router = express.Router();

// Test route tested with postman
router.get('/', function(req, res) {
  res.json({message: "hooray! welcome to this api!"});  
});

// Majority routes here


app.use('/api', router);

app.listen(port);
console.log("api working on port " + port);

