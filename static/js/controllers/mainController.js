function mainController($scope, $http, $timeout, $location){
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
  };
  // incrementScore();

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
};

export default mainController;
