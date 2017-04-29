boiteApp.controller('searchCtrl', function($scope,$http){
  $http.get('js/search.json').then(function(response){
      $scope.users = response.data.mannequins;
    },
      function(err) {
        console.log(err);
    })
});
