import angular from 'angular';
import angularRoute from 'angular-route';
import uiBootstrap from 'angular-ui-bootstrap';
import smartTable from 'angular-smart-table';
import config from './config';
import homeController from './controllers/homeController';
import historyController from './controllers/historyController';
import mainController from './controllers/mainController';
import plantController from './controllers/plantController';
import communityController from './controllers/communityController';
import scoringService from './services/scoringService';
import plantService from './services/plantService';
import 'babel-polyfill';
import 'jquery';
//configuration could be updated and seperated into different files if needed

var moduleName = "app";
var app = angular.module(moduleName, [
 'ngRoute', 'ui.bootstrap', 'smart-table'
]).config(config)
  .factory('scoringService', ['$timeout', scoringService])
  .factory('plantService', ['scoringService', plantService])
  .controller('historyController', historyController)
  .controller('mainController', ['$scope', '$http','$location', 'scoringService', mainController])
  .controller('homeController', ['$scope', '$http', '$timeout', 'scoringService', homeController])
  .controller('plantController', ['$scope', '$http', 'scoringService', 'plantService', plantController])
  .controller('communityController', ['$scope', '$http', 'orderByFilter', 'scoringService', communityController]);

export default moduleName;
