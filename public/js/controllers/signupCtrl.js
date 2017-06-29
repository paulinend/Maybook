boiteApp.controller('signupCtrl', function($scope,$http,AuthService, $location){

  $scope.mannequins = {
    role:'Utilisateur'
  }

    $scope.addModel = function() {
      $http
        .post('http://localhost:3000/api/addModel', $scope.mannequins)
        .then(response => console.log('GOOD', response), (badResponse) => console.log(badResponse))
    };
    $scope.deleteModel = function() {
      $http
        .delete('http://localhost:3000/api/addModel', $scope.mannequins)
        .then(response => console.log('Delete model', response), (badResponse) => console.log(badResponse))
    };
    $scope.signup = () => {
      AuthService.register($scope.mannequins)
      .then((res) => {
        $location.path("/connexion")
      }).catch((err) => {
        console.log('register failed!');
      });
    }
});
