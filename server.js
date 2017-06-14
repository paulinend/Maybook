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

// On déclare l'app
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json())


// On lui défini du middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");// www.google.com monsite.com 143.45.78.23
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});

//On défini ses routes
app.use(routes);

app.post('/search.json', function (req, res) {
  console.log(req.body);
})

// Et on la démarre
app.listen(PORT, (err) => {
  console.log(`listening on port ${PORT}`);
});
