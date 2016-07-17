function mainController($scope, $http, $location, scoringService){
  $scope.progressBar = [{
    imgName: 'Progress_1',
    filled: true
  }, {
    filled: false
  }, {
    filled: false
  }, {
    filled: false
  }, {
    imgName: 'Progress_2',
    filled: false
  }, {
    filled: false
  }, {
    filled: false
  }, {
    filled: false
  }, {
    imgName: 'Progress_3',
    filled: false
  }, {
    filled: false
  }, {
    filled: false
  }, {
    filled: false
  }, {
    imgName: 'Progress_4',
    filled: false
  }];

  function updateProgressBar(perc) {
    for (var i = 0; i < $scope.progressBar.length; i++) {
      $scope.progressBar[i].filled = perc < (i)/12 ? false : true;
    }
  }

  function updateScore (newScore) {
    $scope.score = newScore;
    $scope.userLevel = scoringService.getUserLevel();
    $scope.goalMetrics = scoringService.getGoalMetrics();
    updateProgressBar($scope.goalMetrics.progressPercentage);
  }

  scoringService.subscribe(updateScore);


  $scope.route = function(page){
    $location.path("/#/" + page);
    // var location = $location.path().slice(3);
    // isActive(location);
  };

  $scope.isActive = function(page){
    var view = '/'+page;
    var active = (view === $location.path());
    return active;
  };
};

export default mainController;
