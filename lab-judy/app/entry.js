'use strict';

//require webpack assets
require('./scss/base.scss');

//npm modules
const cowsay = require('cowsay-browser');
const angular = require('angular');

//angular module
const demoApp = angular.module('demoApp', []);

//angular constructs
demoApp.controller('CowsayController', [ '$log', '$scope', CowsayController]);

function CowsayController($log, $scope){
  $log.debug('init CowsayController');

  let cowsayCtrl = $scope.cowsayCtrl = {};
  cowsayCtrl.title = 'Moooo';

  cowsayCtrl.updateCow = function(input){
    $log.debug('cowsayCtrl.updateCow()');

    return '\n' + cowsay.say({text: input || 'type something dammit'});
  };

  cowsayCtrl.helloClick = function(input){
    $log.debug('cowsayCtrl.helloClick()');
    $log.log(input);
  };
}
