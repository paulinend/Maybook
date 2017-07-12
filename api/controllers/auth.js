'use strict';

const jwt = require('jwt-simple');
const TopModels = require('../../database').topModels;
const encodeString = 'secret'



exports.authenticate = function(req, res) {
   TopModels.findOne({
     mail: req.body.mail
   }, function(err, user) {
     if (err) throw err;

     if (!user) {
       res.send({success: false, msg: 'Authentication failed. User not found.'});
     } else {
       // check if password matches
       user.comparePassword(req.body.pwd, function (err, isMatch) {
         if (isMatch && !err) {
           // if user is found and password is right create a token
           const token = jwt.encode(user.mail, encodeString);
           // return the information including token as JSON
           res.json({success: true, token: 'JWT ' + token, user:user});
         } else {
           res.send({success: false, msg: 'Authentication failed. Wrong password.'});
         }
       });
     }
   });
 };

 exports.createToken = function(req, res){
   const token = jwt.encode(req.params.mail, config.secret);
   res.json(token);
 };

 exports.getUsers = function(req, res){
   topModels.find( function(err, users) {
       if (err) throw err;

       else {
         res.json(users);
       }
   });
 };

exports.signup =  function(req, res) {
  console.log(req.body);
  let data = req.body;
  data.token = jwt.encode(data.mail, encodeString);
  TopModels.findOne({
    mail: data.mail
  }, function(err, user) {
    if (!user){
      if (!data.mail || !data.pwd) {
        res.json({success: false, msg: 'Please pass name and password.'});
      } else {
        const newUser = new TopModels(data);
        // save the user
        newUser.save(function(err) {
            if (err) {
              return res.json({success: false, msg: 'email already exists.'});
            }
              return res.json({success: true, msg: 'Successful created new user.'});
        });
      }
    } else {
       res.json({success: false, msg: 'Email already used'});
    }
  });
 };


const getToken = function (headers) {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

exports.verifyToken = function(req, res, next) {
  let token = getToken(req.headers);
  TopModels.findOne({
    mail: req.body.mail
  }, function (err, user) {
    const compareToken = jwt.encode(user.mail, encodeString);
    if (compareToken === token) {
      next()
    } else {
      res.send('Unauthorized')
    }
  }
)
};
