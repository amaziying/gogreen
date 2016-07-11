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
      .when('/history', {
          templateUrl: 'static/views/history.html',
          controller: 'historyController'
      })
      .otherwise({
          redirectTo: '/'
      });

}

config.$inject = ['$routeProvider', "$locationProvider", "$httpProvider"];

export default config;
