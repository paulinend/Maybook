'use strict';

// Toutes les urls qui arrivent ici correspondent à www.site.com/api

const {Router} = require('express');
const bodyParser = require('body-parser');

// L'api récupère les controllers qui l'intéressent

//------------------ /!\ ------------------//
// N'oubliez pas d'importer chaque controller.
// ----------------------------------------//

// STEP 6
// Require ton super nouveau controller topModels.js
const topModels = require('./controllers/topmodels.js');

// Elle crée un nouveau routeur/embranchage rien que pour notre api
const apiRoutes = new Router();

// On utilise bodyParser pour mieux parse les urls et leurs params/body
apiRoutes.use(bodyParser.urlencoded({extended: false}));
apiRoutes.use(bodyParser.json());

// Lorsque l'utilisateur fait une requete GET à l'url www.site.com/api/users
// On appelle la méthode `find` du controller users

// methode get & post localhost:3000/api/users
// on peut écrire la fonction directement sans spécifier les params ils seront automatiquement passés

//------------------ /!\ ------------------//
// N'oubliez pas de définir chaque route.
// ----------------------------------------//

// AUTH CONTROLLER ROUTES
// apiRoutes.post('/login', auth.login);

// USER CONTROLLER ROUTES
apiRoutes.get('/topModels', topModels.find);
// apiRoutes.post('/topModels', auth.register);
// apiRoutes.get('/topModels/restricted', auth.require_token, topModels.restricted);

// STEP 7
// Définir une route pour atteindre la méthode find de topModels


module.exports = apiRoutes
