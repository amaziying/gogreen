function plantController($scope, $http, scoringService){
	$scope.data = "data";

	$scope.currentSeedPage = -1;
	$scope.isWaterActive = false;
	$scope.isShovelActive = false;	
	$scope.selectedSeed = -1;

	var shovelCost = 10;
	var waterCost = 15;
	var seedCost = 300;
	var shovelReminder = "You need to use your shovel to dig a hole first!";
	var seedReminder = "You need to select a seed to be planted!";
	var waterReminder = "You need to water your sprout for it to grow into a tree!";
	var noMoreSeedReminder = "You need to select a seed to be planted!";
	var noMorePointsReminder = "You do not have enough points.";

	$scope.useWater = function(){
		$scope.isShovelActive = false;
		$scope.selectedSeed = -1;
		if($scope.isWaterActive){
			$scope.isWaterActive = false;
		} else {
			$scope.isWaterActive = true;
		}
	};

	$scope.useShovel = function(){
		$scope.isWaterActive = false;
		$scope.selectedSeed = -1;
		if($scope.isShovelActive){
			$scope.isShovelActive = false;
		} else {
			$scope.isShovelActive = true;
		}
	};

	$scope.selectSeed = function(seed){
		$scope.isWaterActive = false;
		$scope.isShovelActive = false;
		if(seed.treeCode >= 0){
			$scope.selectedSeed = seed.treeCode;
		}
	};

	$scope.seeds = [
		{
			"treeCode" : 0,
			"imgName:": "Oak_seed",
		 	"amount": 1,
		 	"name": "Oak Tree"
		},
		{
			"treeCode" : 1,
			"imgName:": "Evergreen_seed",
		 	"amount": 1,
		 	"name": "Evergreen Tree"
		},
		{
			"treeCode" : 2,
			"imgName:": "Maple_seed",
		 	"amount": 1,
		 	"name": "Maple Tree"
		}
	];

	$scope.grid = [];

	// initialize the values for the grid
	for(var i = 0; i < 5; i++){
		$scope.grid[i] = [];
		for(var j = 0; j < 7; j++){
			$scope.grid[i][j] = {
				"type": "", // 0=oak, 1=evergreen, 2=maple
				"state": 0 // 0=nothing, 1=mound, 2=sprout, 3=oak, 4=evergreen, 5=maple
			}
		}
	}

	$scope.plantTree = function(cell){
		if(cell.state == 0){
			if($scope.isShovelActive){
				if($scope.score >= shovelCost){
					scoringService.consumeScore(shovelCost);
					cell.state = 1;					
				} else {
					alert(noMorePointsReminder);
				}
			}
			else if($scope.isWaterActive || $scope.selectedSeed >= 0){
				alert(shovelReminder);
			}
		}
		else if(cell.state == 1){
			if($scope.selectedSeed >= 0){
				if($scope.seeds[$scope.selectedSeed].amount > 0){
					$scope.seeds[$scope.selectedSeed].amount--;
					cell.state = 2;
					cell.type = $scope.selectedSeed;					
				} else {
					alert(noMoreSeedReminder);
				}
			}
			else if($scope.isWaterActive || $scope.isShovelActive){
				alert(seedReminder);
			}
		}
		else if(cell.state == 2){
			if($scope.isWaterActive){
				if($scope.score >= waterCost){
					if(cell.type == 0){
						cell.state = 3;
					}
					if(cell.type == 1){
						cell.state = 4;
					}
					if(cell.type == 2){
						cell.state = 5;
					}
					scoringService.consumeScore(waterCost);					
				} else {
					alert(noMorePointsReminder);
				}
			}
			else if($scope.isShovelActive || $scope.selectedSeed >= 0){
				alert(waterReminder);
			}
		}		
	};

	$scope.browseSeeds = function(){
		$scope.currentSeedPage = 0;
	};

	$scope.buySeeds = function(){
		if($scope.currentSeedPage >= 0){
			if($scope.score >= seedCost) {
				scoringService.consumeScore(seedCost);
				$scope.currentSeedPage = -1;				
				$scope.seeds[$scope.currentSeedPage].amount++;
			} else {
				alert(noMorePointsReminder);
			}
		}
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

};

export default plantController;
