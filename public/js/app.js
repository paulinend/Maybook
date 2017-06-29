var boiteApp = angular.module('boiteApp', [
  'ngRoute'
]);

//Router

boiteApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when('/', {
      templateUrl: "views/homepage.html",
      controller: 'homeCtrl'
    })
    .when('/filtrage', {
      templateUrl: "views/filtrage.html",
      controller: 'searchCtrl'
    })
    .when('/perso/:username', {
      templateUrl: "views/perso.html",
      controller: "persoCtrl"
    })
    .when('/persoUpdate/:username', {
      templateUrl: "views/persoUpdate.html",
      controller: "persoUpdateCtrl"
    })
    .when('/connexion', {
      templateUrl: "views/connexion.html",
      controller: "loginCtrl"
    })
    .when('/inscription', {
      templateUrl: "views/inscription.html",
      controller: "signupCtrl"
    })
    .when('/update', {
      templateUrl: "views/update.html",
      controller: "updateCtrl",
      resolve:{
       function(AuthService, $location){
        const role = AuthService.userRole();
        if (role === 'Utilisateur') {
          return true;
        }else{
          $location.path('/');
          return false;
        }
       }
      }
    })
    .otherwise({
      redirectTo: "/"
    });

}]);
// create the controller and inject Angular's $scope
boiteApp.controller('homeCtrl', function($scope) {

    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});
