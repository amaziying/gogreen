function scoringService ($timeout) {
    var subscriptions = [];
    var currentScore = 0;

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
    }];

    function pushToSubscribers() {
        subscriptions.forEach(function(callback) {
            callback(currentScore);
        });
    }

    function incrementScore() {
        currentScore += 50;
        pushToSubscribers();

        if (currentScore < 4000) {
            $timeout(incrementScore, 3000);
        }
    }

    incrementScore();

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
        getGoalMetrics: function () {
            var userLevel = this.getUserLevel();
            return {
                pointsUntilUpgrade: userLevel.nextLevelScore - currentScore,
                progressPercentage: (currentScore - userLevel.minScore)/(userLevel.nextLevelScore - userLevel.minScore)
            };
        }
    }
}

export default scoringService;