function mainController($scope, $http, $timeout){
  $scope.score = 0;
  $scope.levelNumber = 1;
  $scope.levelName = 'Green Buddy';
  function incrementScore() {
  	$scope.score = $scope.score + 1;
  	if ($scope.score < 1000) {
  		$timeout(incrementScore, 10);
  	} else {
  		$scope.levelName = 'Green Ninja';
  		$scope.levelNumber++;
  	}
  }
  incrementScore();
};

export default mainController;
