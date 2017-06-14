boiteApp.controller('updateCtrl', function($scope,$http){
  console.log("hello update from ctrl");

  $http.get('js/search.json').then(function(response){
      $scope.users = response.data.mannequins;
    },
      function(err) {
        console.log(err);
    });
    $scope.addModel = function() {
      console.log($scope.mannequins);
      $http.post('localhost:3000/search.json', $scope.mannequins);
    };
});
