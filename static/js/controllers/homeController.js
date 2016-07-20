function homeController($scope, $http, $location, $timeout, scoringService){
	//initialize homecontroller
	$scope.showScoreUpdate = false;
	$scope.showHelp = false;

	$scope.help = function(){
		$scope.showHelp = true;
		console.log("agwae");
	};

	$scope.closePage = function(){
		$scope.showHelp = false;
	};

	$scope.seeTutorial = function(){
		// $timeout(function () {
			$location.path('/tutorial2');
		// });
		$scope.showHelp = false;
	};

	$scope.levels = {
		low: {
			className: 'green',
			message: 'Awesome job! Keep your garbage disposal at this level to get maximum points!'
		},
		med: {
			className: 'orange',
			message: 'Looks like there is a lot of garbage in the can! You will be rewarded with less points as the can becomes more full!'
		},
		high: {
			className: 'red',
			message: 'Oh no, too much garbage in the can! To earn maximum points, throw out less waste next time!'
		}
	};

    function updateScore(newScore) {
        $scope.score = newScore;
        $scope.showScoreUpdate = true;
        $timeout(function() {
            $scope.showScoreUpdate = false;
        }, 1000);
    }

    scoringService.subscribe(updateScore);

    $scope.statusLevel = 'med';
    $scope.countdown = '00:10:45';
    $scope.pointIncrementLevel = 50;
    $scope.treesPlanted = 20;
};

export default homeController;
