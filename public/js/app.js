var boiteApp = angular.module('boiteApp', [
  'ngRoute'
]);

// boiteApp.config(['$rootScope', function($rootScope) {
//   $rootScope.routeParams = {
//     link: null,
//     title: null
//   }
// }]);
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
      controller: "persoUpdateCtrl",
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
    .when('/connexion', {
      templateUrl: "views/connexion.html",
      controller: "loginCtrl",
      resolve:{
       function(AuthService, $location){
        const role = AuthService.userRole();
        if (role === 'Utilisateur') {
          $location.path('/update');
          return true;
        }
       }
      }
    })
    .when('/inscription', {
      templateUrl: "views/inscription.html",
      controller: "signupCtrl",
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
// // create the controller and inject Angular's $scope
// boiteApp.controller('homeCtrl', function($scope) {
//
//     // create a message to display in our view
//     $scope.message = 'Everyone come and see how good I look!';
// });

boiteApp.controller('homeCtrl', function($scope,$http,$routeParams){
  $scope.message = 'Everyone come and see how good I look!';
  // console.log($scope.user._id);

  var username = $routeParams.username;
  $http.get('http://localhost:8080/api/topModels').then(function(response){
    $scope.users = response.data;
      $scope.user = _.find($scope.users, {
        'username': username
      });
    },
    function(err) {
      console.log("Error");
    });
});
