boiteApp.controller('persoUpdateCtrl', ['$scope', 'fileUpload', '$http', '$routeParams', '$location', '$rootScope', function($scope, fileUpload, $http, $routeParams, $location, $rootScope) {
    var username = $routeParams.username;
    $http.get('http://localhost:8080/api/topModels').then(function(response){
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
          .put('http://localhost:8080/api/updateOne/' + $scope.user._id, $scope.user)
          .then(response => {
            console.log("this is response" , response.data);
            localStorage.setItem('user' , angular.toJson(response.data));
            $rootScope.model = response.data;
          $location.path('/perso/' + $scope.user.username)
          console.log(response)
        }, (badResponse) => console.log(badResponse))

      };
      $scope.deleteModel = function() {
        console.log($scope.user._id);
        $http
          .delete('http://localhost:8080/api/deleteModel/' + $scope.user._id)
          .then(response => console.log('Model deleted', response), (badResponse) => console.log(badResponse))
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
        $scope.user.photoID = $scope.photoID;
      };

      $scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' );
        // console.dir(file);
        var uploadUrl = 'http://localhost:8080/api/upload/';
        fileUpload.uploadFileToUrl(file, uploadUrl);
      };

}]);
