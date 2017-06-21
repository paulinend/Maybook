boiteApp.controller('persoCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    var username = $routeParams.username;
    $http.get('http://localhost:3000/api/topModels').then(function(response){
      $scope.users = response.data;
        $scope.user = _.find($scope.users, {
          'username': username
        });
      },
      function(err) {
        console.log("Error");
      });
      $scope.deleteModel = function() {
        console.log($scope.user._id);
        $http
          .delete('http://localhost:3000/api/deleteModel/' + $scope.user._id)
          .then(response => console.log('Model deleted', response), (badResponse) => console.log(badResponse))
      };
}]);
