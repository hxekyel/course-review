var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('courses_db', ['courses_db']);
var bodyParser = require('body-parser');

//set which page to load when server starts
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//get the data from mongo and send it to the controller
app.get('/reviewlist', function(req, res){
  console.log("GET request received");

  db.courses_db.find(function(err, docs){
    console.log("\n");
    console.log(docs);
    res.json(docs);
  });
});

//gets the data from the controller and stores it in the mongo database
app.post('/reviewlist', function(req, res){
  db.courses_db.insert(req.body, function(err, doc){
    console.log("Data Inserted into db");
    console.log(req.body);
    res.json(doc);
  })
});

app.get('/reviewlist:id', function(req, res){
  if(req.params.id != ""){
    var filter = "/" + req.params.id + "/";
    console.log("search result received:");
    // console.log("Filter: "filter);
    db.courses_db.find({ $text: { $search: filter } }, function(err, doc){
      res.json(doc);
    })
  }
});

app.listen(3000);
console.log("Server running on port 3000");
