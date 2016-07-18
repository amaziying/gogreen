function plantController($scope, $http, scoringService, plantService){
	$scope.data = "data";

	$scope.currentSeedPage = -1;
	$scope.toolActive = -1; // 0=water, 1=shovel, 2=oakseed, 3=evergreenseed, 4=mapleseed	

	$scope.oak_code = plantService.oak_code;
	$scope.evergreen_code = plantService.evergreen_code;
	$scope.maple_code = plantService.maple_code;

	var shovelCost = 10;
	var waterCost = 15;
	var seedCost = 300;

	var shovelReminder = "You need to use your shovel to dig a hole first!";
	var seedReminder = "You need to select a seed to be planted!";
	var waterReminder = "You need to water your sprout for it to grow into a tree!";
	var noMoreSeedReminder = "You need to select a seed to be planted!";
	var noMorePointsReminder = "You do not have enough points.";

	$scope.useWater = function(){
		$scope.toolActive = 0;
	};

	$scope.useShovel = function(){
		$scope.toolActive = 1;
	};

	$scope.selectSeed = function(seed){
		$scope.toolActive = seed.treeCode;
	};

	$scope.seeds = [
		{
			"treeCode" : $scope.oak_code,
			"imgName:": "Oak_seed",
		 	"amount": plantService.getSeedsAmount()[$scope.oak_code],
		 	"name": "Oak Tree"
		},
		{
			"treeCode" : $scope.evergreen_code,
			"imgName:": "Evergreen_seed",
		 	"amount": plantService.getSeedsAmount()[$scope.evergreen_code],
		 	"name": "Evergreen Tree"
		},
		{
			"treeCode" : $scope.maple_code,
			"imgName:": "Maple_seed",
		 	"amount": plantService.getSeedsAmount()[$scope.maple_code],
		 	"name": "Maple Tree"
		}
	];

	$scope.grid = plantService.getGrid();

	$scope.plantTree = function(cell){
		if(cell.state == 0){
			if($scope.toolActive == 1){
				if(scoringService.getScore() >= shovelCost){
					scoringService.consumeScore(shovelCost);
					cell.state = 1;					
				} else {
					alert(noMorePointsReminder);
				}
			}
			else if($scope.toolActive > -1){
				alert(shovelReminder);
			}
		}
		else if(cell.state == 1){
			if($scope.toolActive >= $scope.oak_code){
				if($scope.seeds[$scope.toolActive-$scope.oak_code].amount > 0){
					plantService.decrementSeedsAmount($scope.toolActive);
					$scope.seeds[$scope.toolActive-$scope.oak_code].amount = plantService.getSeedsAmount()[$scope.toolActive];
					cell.state = 2;
					cell.type = $scope.toolActive;					
				} else {
					alert(noMoreSeedReminder);
				}
			}
			else if($scope.toolActive > -1){
				alert(seedReminder);
			}
		}
		else if(cell.state == 2){
			if($scope.toolActive == 0){
				if(scoringService.getScore() >= waterCost){
					if(cell.type == $scope.oak_code){
						cell.state = 3;
					}
					if(cell.type == $scope.evergreen_code){
						cell.state = 4;
					}
					if(cell.type == $scope.maple_code){
						cell.state = 5;
					}
					scoringService.consumeScore(waterCost);					
				} else {
					alert(noMorePointsReminder);
				}
			}
			else if($scope.toolActive > -1){
				alert(waterReminder);
			}
		}
		plantService.setGrid($scope.grid);		
	};

	$scope.browseSeeds = function(){
		$scope.currentSeedPage = 0;
	};

	$scope.buySeeds = function(){
		if($scope.currentSeedPage >= 0){
			if(scoringService.getScore() >= seedCost) {
				scoringService.consumeScore(seedCost);			
				plantService.incrementSeedsAmount($scope.currentSeedPage+$scope.oak_code);
				$scope.seeds[$scope.currentSeedPage].amount = plantService.getSeedsAmount()[$scope.currentSeedPage+2];
				$scope.currentSeedPage = -1;	
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
