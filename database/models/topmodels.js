'use strict';

// STEP 1 :
// Créer un fichier topmodels.js qui sera un schéma mongoose.
// Mon schéma mongoose est un peu comme une liste d'ingrédients
// Je défini ce qui va constituer mon TopModels.
// Par contre ce n'est pas encore un model entier.
// Un model contient auss i les méthodes de ce TopModels.
// Comme TopModelsModel.find(), TopModelsModel.update(), etc...

const {Schema} = require('mongoose');
const bcrypt = require('bcrypt');


const TopModels = new Schema({
  mail: {
    type: String,
    unique: true,
    required: true
  },
  username: { type: String,
              unique: true,
              required: true
  },
  pwd: {type: String},
  name: { type: String },
  lastname: { type: String },
  age: { type: String},
  taille: { type: String },
  poids: { type: String },
  pointure: { type: String },
  eyes: { type: String },
  hairs: { type: String },
  ethnicity: { type: String },
  xp: { type: String },
  spe: { type: String },
  sexe: { type: String },
  photo: { type: Array, default: [] },
  role: String

});

//"TopModels.pre" déclenché avant que l'user soit sauvegarsé
TopModels.pre('save', function (next) {
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
TopModels.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.pwd, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


module.exports = TopModels;
