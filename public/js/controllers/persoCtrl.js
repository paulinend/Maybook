boiteApp.controller('persoCtrl', ['$scope', '$http', '$routeParams', '$rootScope', function($scope, $http, $routeParams, $rootScope) {
    var modelName = $routeParams.username;
    var user = JSON.parse(localStorage.getItem('user'));
    if ($rootScope.model){
      $scope.model = $rootScope.model;

      console.log(user)
      $scope.isCurrent = (user._id==$scope.model._id)
      console.log($scope.isCurrent);
    }
    else {
    $http.get('http://localhost:8080/api/topModels').then(function(response){
      $scope.users = response.data;

        $scope.model = _.find($scope.users, {
          'username': modelName
        });
        $scope.isCurrent = (user._id==$scope.model._id)
      },
      function(err) {
        console.log("Error");
      });
    }

}]);
