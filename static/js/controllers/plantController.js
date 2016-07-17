function plantController($scope, $http){
	$scope.data = "data";

	$scope.currentSeedPage = -1;
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
		if(seed.treeCode){
			$scope.selectedSeed = seed.treeCode;
		}
	};

	$scope.seeds = [
		{
			"treeCode" : "0",
			"imgName:": "Oak_seed",
		 	"amount": 1,
		 	"name": "Oak Tree"
		},
		{
			"treeCode" : "1",
			"imgName:": "Evergreen_seed",
		 	"amount": 1,
		 	"name": "Evergreen Tree"
		},
		{
			"treeCode" : "2",
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
				if(cell.type == 0){
					cell.state = 3;
				}
				if(cell.type == 1){
					cell.state = 4;
				}
				if(cell.type == 2){
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
				"type": "", // 0=oak, 1=evergreen, 2=maple
				"state": "0" // 0=nothing, 1=mound, 2=sprout, 3=oak, 4=evergreen, 5=maple
			}
		}
	}

	$scope.browseSeeds = function(){
		$scope.currentSeedPage = 0;
	};

	$scope.buySeeds = function(){
		$scope.currentSeedPage = -1;
	};

	$scope.leftNav = function(){
		if($scope.currentSeedPage == 0){
			$scope.currentSeedPage = $scope.seeds.length - 1;
		} else {
			$scope.currentSeedPage--;			
		}
	};

	$scope.rightNav = function(){
		if($scope.currentSeedPage == $scope.seeds.length - 1){
			$scope.currentSeedPage = 0;
		} else {
			$scope.currentSeedPage++;			
		}
	}

	console.log("Plant Trees Here!");
};

export default plantController;
