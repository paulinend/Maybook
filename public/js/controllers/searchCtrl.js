boiteApp.controller('searchCtrl', function($scope,$http, $location, $rootScope){

  $http.get('http://localhost:8080/api/topModels').then(function(response){
      $scope.users = response.data;
    },
      function(err) {
        console.log(err);
    })
    $scope.goToProfile = function(user) {
      $location.path('/perso/' + user.username)
      $rootScope.model = user;
    }
});
