import angular from 'angular';
import angularRoute from 'angular-route';
import uiBootstrap from 'angular-ui-bootstrap';
import smartTable from 'angular-smart-table';
import ngAnimate from 'angular-animate';
import config from './config';
import homeController from './controllers/homeController';
import tutorialController from './controllers/tutorialController';
import tutorialTwoController from './controllers/tutorialTwoController';
import mainController from './controllers/mainController';
import plantController from './controllers/plantController';
import communityController from './controllers/communityController';
import scoringService from './services/scoringService';
import plantService from './services/plantService';
import weightService from './services/weightService';
import 'babel-polyfill';
import 'jquery';
//configuration could be updated and seperated into different files if needed

var moduleName = "app";
var app = angular.module(moduleName, [
 'ngRoute', 'ui.bootstrap', 'smart-table', 'ngAnimate', 'counter'
]).config(config)
  .factory('scoringService', ['$timeout', 'weightService', scoringService])
  .factory('weightService', ['$timeout', '$http', weightService])
  .factory('plantService', ['scoringService', plantService])
  .controller('tutorialController', ['$scope', '$http','$location', 'scoringService',tutorialController])
  .controller('tutorialTwoController', ['$scope', '$http','$location', 'scoringService',tutorialTwoController])
  .controller('mainController', ['$scope', '$http','$location', 'scoringService', mainController])
  .controller('homeController', ['$scope', '$http', '$location', '$timeout', 'scoringService', 'weightService', 'plantService', homeController])
  .controller('plantController', ['$scope', '$http', '$location', 'scoringService', 'plantService', plantController])
  .controller('communityController', ['$scope', '$http', 'orderByFilter', 'scoringService','plantService', communityController]);

export default moduleName;
