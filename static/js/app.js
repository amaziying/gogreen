import angular from 'angular';
import angularRoute from 'angular-route';
import uiBootstrap from 'angular-ui-bootstrap';
import config from './config';
import homeController from './controllers/homeController';
import mainController from './controllers/mainController';
import plantController from './controllers/plantController';
import communityController from './controllers/communityController';
import 'babel-polyfill';
import 'jquery';
//configuration could be updated and seperated into different files if needed

var moduleName = "app";
var app = angular.module(moduleName, [
 'ngRoute', 'ui.bootstrap'
]).config(config)
  .controller('mainController', ['$scope', '$http', '$timeout', mainController])
  .controller('homeController', homeController)
  .controller('plantController', plantController)
  .controller('communityController', communityController);

export default moduleName;
