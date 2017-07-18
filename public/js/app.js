var boiteApp = angular.module('boiteApp', [
  'ngRoute'
])
.run(function($rootScope, $http, $routeParams) {
    $rootScope.userTest = {'firstName': 'Maurice', 'lastName': 'Moss' };
    $rootScope.currentUser = JSON.parse(localStorage.getItem('user'));

    console.log($rootScope.currentUser);

  });

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
          $location.path('/filtrage');
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

boiteApp.controller('homeCtrl', function($scope,$http,$routeParams){
  $scope.message = 'Everyone come and see how good I look!';
  // console.log($scope.user._id);


});
