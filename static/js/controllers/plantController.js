function plantController($scope, $http){
	$scope.data = "data";

	$scope.isWaterActive = false;
	$scope.isShovelActive = false;	
	$scope.selectedSeed = "";

	$scope.useWater = function(){
		$scope.isShovelActive = false;
		$scope.selectedSeed = "";
		if($scope.isWaterActive){
			$scope.isWaterActive = false;
		} else {
			$scope.isWaterActive = true;
		}
	};

	$scope.useShovel = function(){
		$scope.isWaterActive = false;
		$scope.selectedSeed = "";
		if($scope.isShovelActive){
			$scope.isShovelActive = false;
		} else {
			$scope.isShovelActive = true;
		}
	};

	$scope.selectSeed = function(seed){
		$scope.isWaterActive = false;
		$scope.isShovelActive = false;
		if(seed.treeName){
			$scope.selectedSeed = seed.treeName;
		}
	};

	$scope.seeds = [
		{
			"treeName" : "oak",
			"imgName:": "Oak_seed",
		 	"amount": 1,
		 	"name": "Oak Tree"
		},
		{
			"treeName" : "evergreen",
			"imgName:": "Evergreen_seed",
		 	"amount": 1,
		 	"name": "Evergreen Tree"
		},
		{
			"treeName" : "maple",
			"imgName:": "Maple_seed",
		 	"amount": 1,
		 	"name": "Maple Tree"
		}
	];

	$scope.grid = [];

	$scope.plantTree = function(cell){
		if(cell.state == 0){
			if($scope.isShovelActive){
				cell.state = 1;
			}
			else if($scope.isWaterActive || $scope.selectedSeed){
				alert("You need to use your shovel to dig a hole first!");
			}
		}
		else if(cell.state == 1){
			if($scope.selectedSeed){
				cell.state = 2;
				cell.type = $scope.selectedSeed;
			}
			else if($scope.isWaterActive || $scope.isShovelActive){
				alert("You need to select a see to be planted!");
			}
		}
		else if(cell.state == 2){
			if($scope.isWaterActive){
				if(cell.type == "oak"){
					cell.state = 3;
				}
				if(cell.type == "evergreen"){
					cell.state = 4;
				}
				if(cell.type == "maple"){
					cell.state = 5;
				}
			}
			else if($scope.isShovelActive || $scope.selectedSeed){
				alert("You need to water your sprout for it to grow into a tree!");
			}
		}		
	};

	// initialize the values for the grid
	for(var i = 0; i < 5; i++){
		$scope.grid[i] = [];
		for(var j = 0; j < 7; j++){
			$scope.grid[i][j] = {
				"type": "",
				"state": "0"
			}
		}
	}


	console.log("Plant Trees Here!");
};

export default plantController;
