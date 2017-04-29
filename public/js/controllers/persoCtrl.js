boiteApp.controller('persoCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    var name = $routeParams.name;
    var lastname = $routeParams.lastname;
    $http.get('js/search.json').then(function(response){
      $scope.users = response.data.mannequins;
        $scope.user = _.find($scope.users, {
          'name': name,
          'lastname': lastname
        });
      },
      function(err) {
        console.log("Error");
      })
}]);
