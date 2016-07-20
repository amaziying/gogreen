function homeController($scope, $http, $timeout, scoringService, weightService){
    //initialize homecontroller
    $scope.showScoreUpdate = false;
    $scope.level = weightService.getCurrentWeightLevel();

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
