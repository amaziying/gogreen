function tutorialController($scope, $http, $location, scoringService){
  $scope.state = 0;
  $scope.hasSeen = false;
  var page = "home"
  $scope.imgLink = ["static/img/Tutorial_1.png",
  "static/img/Tutorial_2.png",
  "static/img/Tutorial_3.png",
  "static/img/Tutorial_4f.png"];

  $scope.secondLink = ["static/img/Tutorial_1.png",
  "static/img/Tutorial_2.png",
  "static/img/Tutorial_3.png",
  "static/img/Tutorial_4.png"];

  $scope.next = function(){
      $scope.state++;
  };

  $scope.close = function(){
    $scope.state = 0;
    $scope.hasSeen = true;
    $location.path("/#/home");
  };

  $scope.finishedTutorial = function(){
    scoringService.setInitialScore(2000);
    $scope.close();
  }
}

export default tutorialController;
