var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const Mode = require('./model/user');    //used for chart
const User = require('./model/user1');
var jwt = require('jsonwebtoken'); 
var config = require('./config/config');
var app = express();
const port = 3004
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('superSecret', config.secret);
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('login123');
});

app.get('/table', (req, res) => {
  Mode.find({}, function (err, obj) {
      if (err) throw err;
      else {
          res.render('index3', { name: obj });
      }
  })
});




app.post('/authenticate', function (req, res) {
  // find the user
  User.findOne({
    username: req.body.username,
    password: req.body.password
  }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
        const payload = {
          admin: user.username
        };
        var token = jwt.sign(payload, app.get('superSecret'), {
          expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }

  });

});


/**
 * 
 */
app.use('/verify', function (req, res, next) {
  var token = req.headers.tok;
  console.log(token);
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        // req.decoded = decoded;
        
        
        console.log(decoded);
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
})


/**
 * 
 */
    app.get('/verify', function (req, res) {
  res.render('index');
});


/*used for chart*/
/**
 *api to return object obtained from database using GET
 */
app.get('/api', (req, res) => {
  Mode.find({}, function (err, obj) {
     //console.log(req.query.day);
      if (err) throw err;
      else {
//console.log(obj);
          res.json(obj);
      }
  })
});


app.get('/all', (req, res) => {
  Mode.find({}, function (err, obj) {
     //console.log(req.query.day);
      if (err) throw err;
      else {
        
          res.json(obj);
      }
  })
});



app.get('/day123', (req, res) => {
  Mode.find({day:req.headers.day}, function (err, obj) {
   // console.log("individual day")
    // console.log(req.query.day);
      if (err) throw err;
      else {
         // console.log(obj);
          res.json(obj);
      }
  })
});




app.listen(port, () => console.log(`Example app listening on port ${port}!`));

