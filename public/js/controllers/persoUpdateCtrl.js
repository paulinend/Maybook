boiteApp.controller('persoUpdateCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
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
      $scope.UpdateModel = function() {
        $http
          .put('http://localhost:3000/api/updateOne/' + $scope.user._id, $scope.user)
          .then(response => console.log('Model updated', response), (badResponse) => console.log(badResponse))
      };
      $scope.change = function() {
        $scope.user.name = $scope.name;
        $scope.user.lastname = $scope.lastname;
        $scope.user.age = $scope.age;
        $scope.user.taille = $scope.taille;
        $scope.user.poids = $scope.poids;
        $scope.user.pointure = $scope.pointure;
        $scope.user.eyes = $scope.eyes;
        $scope.user.hairs = $scope.hairs;
        $scope.user.ethnicity = $scope.ethnicity;
      }
}]);
