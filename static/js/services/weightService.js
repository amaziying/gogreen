function weightService ($timeout, $http) {
    var subscriptions = [];
    var currentWeight = 0;
    var currentWeightLevel = 'low';

    var weightLevels = [{
        id: 'low',
        prettyName: 'Low',
        maxWeight: 5,
        pointIncrement: 200,
        className: 'green',
        message: 'Awesome job! Keep your garbage disposal at this level to get maximum points!'
    }, {
        id: 'med',
        prettyName: 'Medium',
        maxWeight: 10,
        pointIncrement: 100,
        className: 'orange',
        message: 'Looks like there is a lot of garbage in the can! You will be rewarded with less points as the can becomes more full!'
    }, {
        id: 'high',
        prettyName: 'High',
        maxWeight: 10000000,
        pointIncrement: 50,
        className: 'red',
        message: 'Oh no, too much garbage in the can! To earn maximum points, throw out less waste next time!'
    }];

    function pushToSubscribers(level) {
        subscriptions.forEach(function(callback) {
            callback(level);
        });
    }

    function changedWeight (newWeight) {
        var newWeightLevel = _.find(weightLevels, level => (newWeight <= level.maxWeight));

        if (!newWeightLevel) {
            console.log('Improper weight entry', newWeightLevel);
            return;
        }

        if (currentWeightLevel !== newWeightLevel.id) {
            currentWeightLevel = newWeightLevel.id;
            pushToSubscribers(newWeightLevel);
        }
    }

    function pollServer() {
        $http.get('/api/data').then(function (weight) {
            var latestWeight = parseFloat(weight.data);
            if (currentWeight !== latestWeight) {
                currentWeight = latestWeight;
                changedWeight(currentWeight);
            }
            $timeout(pollServer, 1000);
        }, function (err) {
            console.log(err);
        });
    }

    pollServer();

    return {
        subscribe: function (callback) {
            subscriptions.push(callback);
            return true;
        },
        getCurrentWeightLevel: function () {
            return _.find(weightLevels, level => currentWeightLevel === level.id);
        }
    }
}

export default weightService;