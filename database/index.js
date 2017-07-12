'use strict';


const mongoose = require('mongoose');

const topModels = require('./models/topmodels.js');
// const User = require('./models/user.js');

// STEP 2
// Dans mongoose require mon shéma topmodel.js sous le nom topModel

// STEP 3 :
// créer et exporter mon model sous le nom topModel et 'TopModel'
// qui permettra d'avoir accés à mon model TopModel en utilisant db.topModel
const db = {
  topModels: mongoose.model('TopModels', topModels),
  // User: mongoose.model('User', User)
}


// db.users, db.products, db.topModels
module.exports = db;
