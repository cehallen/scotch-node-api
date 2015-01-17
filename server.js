

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

router.use(function(req, res, next) {
  console.log('something is happening.');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: "hooray! welcome to this api!" });  
});

router.route('/bears')
  .post(function(req, res) {
    var bear = new Bear();
    bear.name = req.body.name;
    bear.save(function(err) {
      if (err) res.send(err);
      res.json({ message: 'bear created!' });
    });
  })
  .get(function(req, res) {
    Bear.find(function(err, bears) {
      if (err) res.send(err);
      res.json(bears);
    });
  });

router.route('/bears/:bear_id')
  .get(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err) res.send(err);
      res.json(bear);
    });
  })
  .put(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err) res.send(err);
      bear.name = req.body.name;
      bear.save(function(err) {
        if (err) res.send(err);
        res.json({ message: 'bear updated!' });
      });
    });
  })
  .delete(function(req, res) {
    // you can also do this in the same syntax as above: find bear by id, and bear.remove...
    Bear.remove({
      _id: req.params.bear_id
    }, function(err, bear) {
      if (err) res.send(err);
      res.json({ message: 'successfully deleted' });
    });
  });

app.use('/api', router);

app.listen(port);
console.log("api working on port " + port);

