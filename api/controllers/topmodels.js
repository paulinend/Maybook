'use strict';

// STEP4
// creer un fichier de controller topModels.js
// qui va recuperer le model de database.topModel sous le nom TopModel


const TopModels = require('../../database').topModels;
//const TopModel .....

//------------------ /!\ ------------------//
// N'oubliez pas de rajouter la méthode pour chaque route.
// ----------------------------------------//


// STEP5
// définir une méthode simple qui permet de find tout tes topModels

const topModels  = {

  // Find a topmodel by name
  find : (req, res) => {
    console.log('hello');
    console.log(TopModels);
    TopModels.find()
    .then( data => {
      res.send(data);
    })
    .catch( err => {
      res.send('Operation failed :: ' + err)
    });
  },

  restricted : (req, res) => {
    console.log('Accessed the restricted area');
    res.send('Access authorized');
  }

}

module.exports = topModels;
