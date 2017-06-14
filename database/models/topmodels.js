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
  hash: {
    type: String,
    unique: true,
    required: true
  }
});

module.exports = TopModels;
