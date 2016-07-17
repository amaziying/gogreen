function homeController($scope, $http, scoringService){
	//initialize homecontroller
	$scope.levels = {
		low: {
			className: 'green',
			message: 'Awesome job! Keep your garbage disposal at this level to get maximum points!'
		},
		med: {
			className: 'orange',
			message: ''
		},
		high: {
			className: 'red',
			message: ''
		}
	};

	function updateScore(newScore) {
		$scope.score = newScore;
	}

	scoringService.subscribe(updateScore);

	$scope.statusLevel = 'low';
	$scope.countdown = '00:10:45';
	$scope.pointIncrementLevel = 50;
	$scope.treesPlanted = 20;
};

export default homeController;
