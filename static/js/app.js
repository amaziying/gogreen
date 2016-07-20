import angular from 'angular';
import angularRoute from 'angular-route';
import uiBootstrap from 'angular-ui-bootstrap';
import smartTable from 'angular-smart-table';
import config from './config';
import homeController from './controllers/homeController';
import tutorialController from './controllers/tutorialController';
import tutorialTwoController from './controllers/tutorialTwoController';
import mainController from './controllers/mainController';
import plantController from './controllers/plantController';
import communityController from './controllers/communityController';
import scoringService from './services/scoringService';
import 'babel-polyfill';
import 'jquery';
//configuration could be updated and seperated into different files if needed

var moduleName = "app";
var app = angular.module(moduleName, [
 'ngRoute', 'ui.bootstrap', 'smart-table'
]).config(config)
  .factory('scoringService', ['$timeout', scoringService])
  .controller('tutorialController', ['$scope', '$http','$location', 'scoringService',tutorialController])
  .controller('tutorialTwoController', ['$scope', '$http','$location', 'scoringService',tutorialTwoController])
  .controller('mainController', ['$scope', '$http','$location', 'scoringService', mainController])
  .controller('homeController', ['$scope', '$http', '$location', '$timeout', 'scoringService', homeController])
  .controller('plantController', ['$scope', '$http', '$location', 'scoringService', plantController])
  .controller('communityController', ['$scope', '$http', 'orderByFilter', 'scoringService', communityController]);

export default moduleName;
