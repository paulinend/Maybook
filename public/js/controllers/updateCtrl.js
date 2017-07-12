boiteApp.controller('updateCtrl', function($scope,$http){
  console.log("hello update from ctrl");

  $http.get('http://localhost:8080/api/topModels').then(function(response){
      $scope.users = response.data;
    },
      function(err) {
        console.log(err);
    });
    $scope.addModel = function() {
      $http
        .post('http://localhost:8080/api/addModel', $scope.mannequins)
        .then(response => console.log('GOOD', response), (badResponse) => console.log(badResponse))
    };
    $scope.deleteModel = function() {
      $http
        .delete('http://localhost:8080/api/deleteModel', $scope.mannequins)
        .then(response => console.log('Model deleted', response), (badResponse) => console.log(badResponse))
    };
});
