var myApp = angular.module('myApp', []);

//the app controller
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
  console.log("Hello World from controller!!!");

  //gets the data from the server and stores it in scope.reviewlist to print in index
  $http.get('/reviewlist').success(function(response){
        console.log("I got the data I requested");
        $scope.reviewlist = response;
  });

  //submit method send the data throught post to the server
  $scope.submitReview = function() {
    $http.post('/reviewlist', $scope.review).success(function(response){
      console.log(response);
      $scope.review = "";
    });
  };

  $scope.search = function() {
    if ($scope.filter != ""){
      console.log($scope.filter);
      $http.get('/reviewlist' + $scope.filter).success(function(response){
        $scope.reviewlist = response;
      })
    }
  }

}]);
