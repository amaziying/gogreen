function communityController($scope, $http, orderBy, scoringService){
	$scope.data = {id: 1, name: "my name", score: null, level: 4};
	$scope.displayedCollection = [];
	$scope.userCollection = [
		{name: "userOne", score: 500, level: 3},
		{name: "userTwo", score: 400, level: 4},
		{name: "userThree", score: 300, level: 5},
		{name: "userFowur", score: 61, level: 6},
		{name: "userFoeur", score: 60, level: 6},
		{name: "userFofur", score: 6300, level: 6},
		{name: "userFoeur", score: 6550, level: 6},
		{name: "userFhour", score: 6003, level: 6},
		{name: "userFohur", score: 6002, level: 6},
		$scope.data
	];

	$scope.$watch('data.score', function(){
	 	$scope.userCollection.sort(function(a, b){
			return b.score-a.score;
		});
		$scope.rank = $scope.userCollection.indexOf($scope.data) + 1;
	});

	setTimeout(function(){
		$scope.userCollection.sort(function(a, b){
		return a-b;
	});
	$scope.rank = $scope.userCollection.indexOf($scope.data); }, 1000);

	function updateScore(newScore) {
		$scope.score = newScore;
		$scope.data.score = newScore;
	}

	scoringService.subscribe(updateScore);
};

export default communityController;
