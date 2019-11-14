var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.json());
app.use(express.urlencoded());

const { MongoClient, ObjectID } = require('mongodb');

var url = "mongodb://vaibhavj:vaibhavj@localhost:27017/LocalBuzz";

let db;

MongoClient.connect(url, { useUnifiedTopology: true }, function(
  err,
  client
) {
  db = client.db('LocalBuzz');
  console.log('Successfully connected to DB');
  if (err) throw err;
});

let db_reader;
var url_reader = "mongodb://vaibhavj:vaibhavj@localhost:27017/LocalBuzz";

MongoClient.connect(url_reader, { useUnifiedTopology: true }, function(
  err,
  client
) {
  db_reader = client.db('LocalBuzz');
  console.log('Succesfuly connected to DB as reader');
  if (err) throw err;
});

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/signup_user', urlencodedParser, function (req, res) {
   var username = req.body.data.username;
   var password = req.body.data.password;
   bcrypt.hash(password, 10, function(err, hash) {
    var query = { username: username };
    db_reader.collection("students").find(query).toArray(function(err, result) {
      if (err)
      {
        console.log("Error");
      }
      else
      {
        console.log(result.length);
        if(result.length == 0)
        {
          db_reader.collection("students").find().toArray(function(err, result2){
            var new_document = {
              id: result2.length + 1,
              username: username,
              password: hash,
              my_clubs: []
            };
            db.collection("students").insertOne(new_document, function(err, res2){
              if (err) throw err;
              console.log("1 document inserted");
              response={
                status: 1,
                message: "New User Created. Please Login to Proceed"
              };
              res.end(JSON.stringify(response));
            })
          })
        }
        else
        {
          console.log(result);
          response = {
            status: 0,
            message: "Username already exists"
          };
          res.end(JSON.stringify(response));
        }
      }
    });
  });
})


app.post('/signup_club', urlencodedParser, function (req, res) {
   var username = req.body.data.username;
   var password = req.body.data.password;
   bcrypt.hash(password, 10, function(err, hash) {
    var query = { username: username };
    db_reader.collection("clubs").find(query).toArray(function(err, result) {
      if (err)
      {
        console.log("Error");
      }
      else
      {
        console.log(result.length);
        if(result.length == 0)
        {
          db_reader.collection("clubs").find().toArray(function(err, result2){
            var new_document = {
              id: result2.length + 1,
              username: username,
              password: hash,
              my_posts: []
            };
            db.collection("clubs").insertOne(new_document, function(err, res2){
              if (err) throw err;
              console.log("1 document inserted");
              response={
                status: 1,
                message: "New User Created. Please Login to Proceed"
              };
              res.end(JSON.stringify(response));
            })
          })
        }
        else
        {
          console.log(result);
          response = {
            status: 0,
            message: "Username already exists"
          };
          res.end(JSON.stringify(response));
        }
      }
    });
  });
})


app.post("/login_student", urlencodedParser, function (req, res){
  var username = req.body.data.username;
  var password = req.body.data.password;
  var query = { username: username };
  db_reader.collection("students").find(query).toArray(function(err, result){
    if (err) throw err;
    if(result.length == 0)
    {
      response = {
        status: 0,
        messages: []
      }
      res.end(JSON.stringify(response));
    }
    else
    {
      bcrypt.compare(password, result[0]["password"], function(err, res_comp) {
        if(res_comp == true)
        {
        	response = {
              status: 1,
              userid: result[0]["id"],
              username: result[0]["username"],
              my_clubs: result[0]["my_clubs"]
            };
            console.log(response);
            res.end(JSON.stringify(response));
        }
        else
        {
          response = {
            status: 0,
            messages: []
          }
          res.end(JSON.stringify(response));
        }
      });
    }
  });
})

app.post("/login_club", urlencodedParser, function (req, res){
  var username = req.body.data.username;
  var password = req.body.data.password;
  var query = { username: username };
  db_reader.collection("clubs").find(query).toArray(function(err, result){
    if (err) throw err;
    if(result.length == 0)
    {
      response = {
        status: 0,
        messages: []
      }
      res.end(JSON.stringify(response));
    }
    else
    {
      bcrypt.compare(password, result[0]["password"], function(err, res_comp) {
        if(res_comp == true)
        {
          response = {
              status: 1,
              userid: result[0]["id"],
              username: result[0]["username"],
              my_posts: result[0]["my_posts"]
            };
            console.log(response);
            res.end(JSON.stringify(response));
        }
        else
        {
          response = {
            status: 0,
            messages: []
          }
          res.end(JSON.stringify(response));
        }
      });
    }
  });
})

app.post('/new_post', urlencodedParser, function (req, res) {
   var username = req.body.data.username;
   var heading = req.body.data.heading;
   var message = req.body.data.message;
   var time = req.body.data.time;

   var new_doc = {
   	heading: heading,
   	message: message,
   	time: time
   }

   var query = { username: username };
   db_reader.collection("clubs").find(query).toArray(function(err,result){
   	if(err){
   		console.log(err);
   	}
   	else{
		db.collection("clubs").update(query,{ $push: {"my_posts": new_doc}});
		console.log("New post added.");
		console.log(new_doc);
		response={
            status: 1,
            message: "Posted Successfully!"
        };
        res.end(JSON.stringify(response)); 		
   	}

   });
})


app.post('/subscribe', urlencodedParser, function (req, res) {
   var username = req.body.data.username;
   var club = req.body.data.club;

   var new_doc = {
     username_club: club
   }

   var query = { username: club };
   db_reader.collection("clubs").find(query).toArray(function(err,result){
     if(err){
       console.log(err);
     }
     else{
       if(result.length == 0){
         console.log("No such club!")
         response={
           status: 0,
           message: "No such club exists!"
         }
         res.end(JSON.stringify(response));
       }
       else{
         var query2 = { username: username};
         db.collection("students").update(query2,{ $push: {"my_clubs":new_doc} });
         console.log("New club added!");
         console.log(new_doc);
             response={
            status: 1,
            message: "Subscribed Successfully!"
        };
        res.end(JSON.stringify(response));
       }    
     }

   });
})

app.post("/club_feed", urlencodedParser, function (req, res){
  var username = req.body.data.username;
  var query = { username: username };
  db_reader.collection("clubs").find(query).toArray(function(err, result){
    if (err) throw err;
    if(result.length == 0)
    {
      response = {
        status: 0,
        messages: []
      }
      res.end(JSON.stringify(response));
    }
    else
    {
      response = {
        status: 1,
        username: result[0]["username"],
        my_posts: result[0]["my_posts"]
       };
       console.log(response);
       res.end(JSON.stringify(response));
    }
  });
})


const PORT = 20000;
app.listen(PORT, () => console.log(`Live at port ${PORT}`));