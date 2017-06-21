'use strict';

// STEP 1 :
// Créer un fichier topmodels.js qui sera un schéma mongoose.
// Mon schéma mongoose est un peu comme une liste d'ingrédients
// Je défini ce qui va constituer mon User.
// Par contre ce n'est pas encore un model entier.
// Un model contient aussi les méthodes de ce User.
// Comme UserModel.find(), UserModel.update(), etc...

const {Schema} = require('mongoose');

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
  name: { type: String },
  lastname: { type: String },
  age: { type: Number, min: 14, max: 99 },
  taille: { type: Number },
  poids: { type: Number },
  pointure: { type: Number },
  eyes: { type: String },
  hairs: { type: String },
  ethnicity: { type: String },
  sexe: { type: String }

});

module.exports = TopModels;
