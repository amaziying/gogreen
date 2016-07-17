function plantController($scope, $http){
	$scope.data = "data";
	$scope.seeds = [
		{
			"imgName:": "Oak_seed",
		 	"amount": 1,
		 	"name": "Oak Tree"
		},
		{
			"imgName:": "Evergreen_seed",
		 	"amount": 1,
		 	"name": "Evergreen Tree"
		},
		{
			"imgName:": "Maple_seed",
		 	"amount": 1,
		 	"name": "Maple Tree"
		}
	];
	console.log("Plant Trees Here!");
};

export default plantController;
