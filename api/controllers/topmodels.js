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
  // Find a topmodel by username
  findOne: (req, res) => {
    TopModels.find({username: req.params.username})
    .then(data => res.send(data))
    .catch(err => res.send(err));

  },
  find : (req, res) => {
    TopModels.find()
    .then( data => {
      res.send(data);
    })
    .catch( err => {
      res.send('Operation failed :: ' + err)
    });
  },
  create: (req, res) => {
    const model = new TopModels();
    const data = req.body;
    const newModel = Object.assign({}, model, data);

    TopModels
      .create(newModel)
      .then(model => res.send(model))
      .catch(error => res.send(error));
  },
  deleteOne(req, res, next) {
    TopModels.findByIdAndRemove(
        { _id: req.params.id },
        (error, topModels) => {
          if (error) {
            next(error);
          } else {
            res
              .status(200)
              .end();
          }
        }
      )
  },
  updateOne(req, res, next) {
		TopModels.findByIdAndUpdate(
				{ _id: req.params.id },
				{ $set: req.body },
				{ new: true },
				(error, topModels) => {
					if (error) {
						next(error);
					} else {
						res.json(topModels);
					}
				}
			);
	},
  restricted : (req, res) => {
    console.log('Accessed the restricted area');
    res.send('Access authorized');
  }

}

module.exports = topModels;
