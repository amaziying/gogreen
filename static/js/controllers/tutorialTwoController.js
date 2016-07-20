function tutorialTwoController($scope, $http, $location, scoringService){
  $scope.state = 0;

  $scope.secondLink = ["static/img/Tutorial_1.png",
  "static/img/Tutorial_2.png",
  "static/img/Tutorial_3.png",
  "static/img/Tutorial_4.png"];

  $scope.next = function(){
      $scope.state++;
  };

  $scope.close = function(){
      $scope.state = 0;
      window.history.back();
    }
};

export default tutorialTwoController;
