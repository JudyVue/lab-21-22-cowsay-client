'use strict';

//require webpack assets
require('./scss/base.scss');

//npm modules
const cowsay = require('cowsay-browser');
const angular = require('angular');

//angular module
//the 2 args means this is a setter app that creates actual demoApp module
const demoApp = angular.module('demoApp', []);

//angular constructs
demoApp.controller('CowsayController', [ '$log', CowsayController]);

function CowsayController($log){
  $log.debug('init CowsayController');

  this.title = 'Moooo';
  this.history = [];
  cowsay.list( (err, cowfiles) => {
    this.cowfiles = cowfiles;
    this.currentCow = this.cowfiles[0];
    console.log(this.cowfiles);
  });

  //renders cow to page with text from input field
  this.updateCow = function(input){
    $log.debug('cowsayCtrl.updateCow()');
    return '\n' + cowsay.say({text: input || 'type something dammit', f: this.currentCow});
  };

  this.speak = function(input){
    $log.debug('cowsayCtrl.updateCow()');
    this.spoken = this.updateCow(input);
    this.history.push(this.spoken);
  };
  this.undo = function(){
    $log.debug('this.undo()');
    this.spoken = this.history.pop() || '';
  };

}

demoApp.controller('NavController', ['$log', NavController]);
function NavController($log){
  $log.debug('NavController');
  this.routes = [
    {
      name: 'Home',
      url: '/home',
    },
    {
      name: 'About',
      url: '/about',
    },
  ];
}
