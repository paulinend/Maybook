boiteApp.controller('searchCtrl', function($scope,$http){
  $http.get('http://localhost:3000/api/topModels').then(function(response){
      $scope.users = response.data;
    },
      function(err) {
        console.log(err);
    })
});
