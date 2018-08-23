var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

// https://tecadmin.net/setup-nodejs-with-mongodb-on-ubuntu/
// https://tecadmin.net/install-mongodb-on-ubuntu/
// https://www.npmjs.com/package/mongodb
var url = 'mongodb://localhost:27017';
var dbName = 'test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    var cursor = db.collection('user-data').find();

    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      client.close();
      res.render('index', {items: resultArray});
    });
  })
});

router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  mongo.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);

    db.collection('user-data').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      client.close();
    });
  });

  res.redirect('/');
});

router.post('/update', function(req, res, next) {
  ;
});

router.post('/delete', function(req, res, next) {
  ;
});

module.exports = router;
