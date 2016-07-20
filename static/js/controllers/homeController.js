function homeController($scope, $http, $location, $timeout, scoringService, weightService, plantService){
    // tutorial
    $scope.showHelp = false;

    $scope.help = function(){
        $scope.showHelp = true;
    };

    $scope.closePage = function(){
        $scope.showHelp = false;
    };

    $scope.seeTutorial = function(){
        $location.path('/tutorial2');
        $scope.showHelp = false;
    };

    //initialize homecontroller
    $scope.showScoreUpdate = false;
    $scope.level = weightService.getCurrentWeightLevel();
    $scope.treesPlanted = plantService.getTreesPlanted();

    function syncCountdownTimer() {
        $scope.countdownTimer = formatTimer(scoringService.getCountdown());
        $timeout(syncCountdownTimer, 500);
    }

    function updateScore(newScore) {
        $scope.score = newScore;
        $scope.showScoreUpdate = true;

        $timeout(function() {
            $scope.showScoreUpdate = false;
        }, 1000);
    }

    function updateWeightLevel(level) {
        if ($scope.level !== level) {
            $scope.level = level;
        }
    }

    function formatTimer(seconds) {
        var str = '00:'
        var strSeconds = seconds.toString();

        if (strSeconds.length == 1) {
            str += '0';
        }

        return str + strSeconds;
    }

    syncCountdownTimer();
    scoringService.subscribe(updateScore);
    weightService.subscribe(updateWeightLevel);
};

export default homeController;
