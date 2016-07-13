function mainController($scope, $http, $timeout, $location){
  $scope.score = 0;
  $scope.levelNumber = 1;
  $scope.goal = 2000
  $scope.levelName = 'Green Buddy';

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

  function incrementScore() {
  	$scope.score = $scope.score + 1;

  	if ($scope.score%Math.round($scope.goal/12) === 0) {
  		incrementDot();
  	}
  	if ($scope.score < $scope.goal) {
  		$timeout(incrementScore, 10);
  	} else {
  		$scope.levelName = 'Green Ninja';
  		$scope.levelNumber++;
  		incrementDot();
  	}
  };

  $scope.route = function(page){
    $location.path("/#/" + page);
    // var location = $location.path().slice(3);
    // isActive(location);
  };

  $scope.isActive = function(page){
    var view = '/'+page;
    var active = (view === $location.path());
    console.log(view);
    console.log($location.path());
    console.log(active);
    return active;
  };


  function incrementDot() {
  	for (var i = 0; i < $scope.progressBar.length; i++) {
  		if (!$scope.progressBar[i].filled){
  			$scope.progressBar[i].filled = true;
  			break;
  		}
  	}
  }

  incrementScore();
};

export default mainController;
