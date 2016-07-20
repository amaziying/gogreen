function scoringService ($timeout, weightService) {
    var subscriptions = [];
    var currentScore = 0;
    var currentWeightLevel = weightService.getCurrentWeightLevel();

    var totalTime = 10;
    var countdown = totalTime;

    var levels = [{
        minScore: 0,
        nextLevelScore: 150,
        level: 1,
        levelName: 'Green Buddy'
    }, {
        minScore: 150,
        nextLevelScore: 700,
        level: 2,
        levelName: 'Green Ninja'
    }, {
        minScore: 700,
        nextLevelScore: 2000,
        level: 3,
        levelName: 'Green Hero'
    }, {
        minScore: 2000,
        nextLevelScore: 4000,
        level: 4,
        levelName: 'Green Master'
    }, {
        minScore: 4000,
        nextLevelScore: 10000,
        level: 5,
        levelName: 'Green Grand Master'
    }];


    function pushToSubscribers() {
        subscriptions.forEach(function(callback) {
            callback(currentScore);
        });
    }

    function changedWeightLevel(newWeightLevel) {
        currentWeightLevel = newWeightLevel;
    }

    weightService.subscribe(changedWeightLevel);

    function countdownTimer() {
        countdown--;
        if (countdown === 0) {
            countdown = totalTime;
            currentScore += currentWeightLevel.pointIncrement;
            pushToSubscribers();
        }

        $timeout(countdownTimer, 1000);
    }

    countdownTimer();

    return {
        subscribe: function (callback) {
            subscriptions.push(callback);
            return true;
        },
        getScore: function () {
            return currentScore;
        },
        consumeScore: function (cost) {
            currentScore = currentScore - cost;
            pushToSubscribers();
            return currentScore;
        },
        getUserLevel: function () {
            for (var i = 0; i < levels.length; i++) {
                if (currentScore < levels[i].nextLevelScore || i === levels.length - 1) {
                    return levels[i];
                }
            }
        },
        getCountdown: function () {
            return countdown;
        },
        getGoalMetrics: function () {
            var userLevel = this.getUserLevel();
            return {
                pointsUntilUpgrade: userLevel.nextLevelScore - currentScore,
                progressPercentage: (currentScore - userLevel.minScore)/(userLevel.nextLevelScore - userLevel.minScore)
            };
        },
        setInitialScore: function (score) {
            currentScore = score;
            countdown = totalTime;
            pushToSubscribers();
        }
    }
}

export default scoringService;
