boiteApp.controller('signupCtrl', function($scope,$http){
  console.log("hello connexion from ctrl");
  $http.get('js/search.json').then(function(response){
      $scope.users = response.data.mannequins;
    },
      function(err) {
        console.log(err);
    });
  $scope.addModel = function() {
    console.log($scope.mannequins);
    $http.post('js/search.json')
  };
});
