function config($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider
      .when('/', {
          templateUrl: 'static/views/home.html',
          controller: 'homeController'
      })
      .when('/plant', {
          templateUrl: 'static/views/plant.html',
          controller: 'plantController'
      })
      .when('/community', {
          templateUrl: 'static/views/community.html',
          controller: 'communityController'
      })
      .when('/tutorial', {
          templateUrl: 'static/views/tutorial.html',
          controller: 'tutorialController'
      })
      .when('/tutorial2', {
          templateUrl: 'static/views/tutorialTwo.html',
          controller: 'tutorialTwoController'
      })
      .otherwise({
          redirectTo: '/'
      });

}

config.$inject = ['$routeProvider', "$locationProvider", "$httpProvider"];

export default config;
