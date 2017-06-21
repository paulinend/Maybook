'use strict';

//global.config = require('./config/config.js');
// L'entrée de notre application.
// A chaque fois que je veux accéder à mon site il utilisera ce serveur pour traiter ma demande.
// Express est le serveur http qui écoute les requêtes et y répond
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
// Route est un bout de code qui va nous envoyer vers l'api ou le site selon notre besoin
const routes = require('./routes.js');
const mongoose = require('mongoose');

// On déclare l'app
const app = express();

app.use(express.static(__dirname + "/public"));

mongoose.connect('mongodb://localhost:27017/paupau', (err) => {
  if (err) return console.log(err);
  console.log('connection to DB established')
});


// On lui défini du middleware
app.use((req, res, next) => {
    		res.header('Access-Control-Allow-Origin', '*');
    		res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
    		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    		next();
});

//On défini ses routes
app.use(routes);


// Et on la démarre
app.listen(PORT, (err) => {
  console.log(`listening on port ${PORT}`);
});
