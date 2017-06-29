'use strict';

const {Schema} = require('mongoose');
const bcrypt = require('bcrypt');

const User = new Schema({
  mail: {
    type: String,
    unique: true,
    required: true
  },
  name: { type: String },
  lastname: { type: String },
  pwd: {type: String},
  role: String


});
//"User.pre" déclenché avant que l'user soit sauvegarsé
User.pre('save', function (next) {
    const user = this;
    if (this.isModified('pwd') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.pwd, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.pwd = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
//Comparer les mdp crypté
User.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.pwd, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};



module.exports = User;
