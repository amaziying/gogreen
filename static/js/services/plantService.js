function plantService(scoringService) {

	var grid = [];
	var seedsAmount = {
		"2": 1, //oak
		"3": 1, //evergreen
		"4": 1  //maple
	};
	var isGridInitialized = false;

	var shovelCost = 10;
	var waterCost = 15;
	var seedCost = 300;
	var shovelReminder = "You need to use your shovel to dig a hole first!";
	var seedReminder = "You need to select a seed to be planted!";
	var waterReminder = "You need to water your sprout for it to grow into a tree!";
	var noMoreSeedReminder = "You need to select a seed to be planted!";
	var noMorePointsReminder = "You do not have enough points.";	

	// initialize the values for the grid
	if(!isGridInitialized){
		for(var i = 0; i < 5; i++){
			grid[i] = [];
			for(var j = 0; j < 7; j++){
				grid[i][j] = {
					"type": "", // 0=oak, 1=evergreen, 2=maple
					"state": 0 // 0=nothing, 1=mound, 2=sprout, 3=oak, 4=evergreen, 5=maple
				}
			}
		}
	}

	return {
		oak_code: 2,
		evergreen_code: 3,
		maple_code: 4,
		getGrid: function(){
			return grid;
		},
		setGrid: function(gardenGrid){
			grid = gardenGrid;
		},
		getSeedsAmount: function(){
			return seedsAmount;
		},
		incrementSeedsAmount: function(treeCode){
			seedsAmount[treeCode] += 1;
		},
		decrementSeedsAmount: function(treeCode){
			seedsAmount[treeCode] -= 1;
		}
	}
}

export default plantService;