function communityController($scope, $http, orderBy, scoringService, plantService){
	$scope.data = {id: 1, name: "Susie Gee", score: null, level: 4, path: "static/img/susie.png"};
	$scope.displayedCollection = [];
	$scope.trees = null;
	$scope.userCollection = [
		{name: "Sanhar Balachandran", score: 500, level: 3, path: "static/img/sanhar.png"},
		{name: "Sadu Hashmani", score: 400, level: 4, path: "static/img/sadu.png"},
		{name: "Bainian Liu", score: 300, level: 5, path: "static/img/bainian.jpg.png"},
		{name: "Ziying Zhang", score: 61, level: 6, path: "static/img/ziying.png"},
		{name: "Nabeel Shahid", score: 60, level: 6, path: "static/img/nabeel.png"},
		{name: "Felix Wei", score: 6300, level: 6, path: "static/img/felixw.png"},
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

	setTimeout(function(){
		$scope.trees = plantService.getTreesPlanted();
	 }, 0);

	function updateScore(newScore) {
		$scope.score = newScore;
		$scope.data.score = newScore;
	}

	scoringService.subscribe(updateScore);
};

export default communityController;
