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
      .otherwise({
          redirectTo: '/'
      });

}

config.$inject = ['$routeProvider', "$locationProvider", "$httpProvider"];

export default config;
