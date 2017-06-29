boiteApp.controller('loginCtrl', function($scope,$http,AuthService){

    $scope.login = () => {
      AuthService.login($scope.mannequins)
      .then(response => console.log('User logged', response), (badResponse) => console.log(badResponse))

    }
});
