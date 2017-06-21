boiteApp.controller('signupCtrl', function($scope,$http){
  console.log("hello connexion from ctrl");
  $http.get('js/search.json').then(function(response){
      $scope.users = response.data;
    },
      function(err) {
        console.log(err);
    });
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
});
