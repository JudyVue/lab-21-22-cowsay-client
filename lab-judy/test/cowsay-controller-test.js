'use strict';

require('./lib/test-setup');

const cowsay = require('cowsay-browser');
const angular = require('angular');

describe('testing cowsayCtrl', function(){
  beforeEach(() => {
    angular.mock.module('demoApp');
    angular.mock.inject($controller => {
      this.cowsayCtrl = new $controller('CowsayController');
    });
  });


  describe('testing initial properties', () => {

    //1. Test for title = Mooo
    it('should have title = Moooo', () => {
      expect(this.cowsayCtrl.title).toBe('Moooo');
    });

    //2. Test for empty history array
    it('should have empty history array', () => {
      expect(Array.isArray(this.cowsayCtrl.history)).toBe(true);
    });

    //3. Test that cowfiles = cowsay.list
    it('should have cowfiles = cowsay.list', () => {
      cowsay.list((err, list) => {
        expect(this.cowsayCtrl.cowfiles).toEqual(list);
        expect(this.cowsayCtrl.currentCow).toEqual(list[0]);
      });
    });
  });

  describe('testing #updateCow()', () => {

    //4. Test that #updateCow returns Beavis
    it('should return beavis with hello', () => {
      let expectedResult = '\n' + cowsay.say({text: 'hello', f: this.cowsayCtrl.currentCow});
      let result = this.cowsayCtrl.updateCow('hello');
      expect(result).toEqual(expectedResult);
    });
  });

  describe('testing #speak()', () => {
    //5. Test that #speak returns Beavis
    it('should return beavis with hello', () => {
      let expectedResult = '\n' + cowsay.say({text: 'hello', f: this.cowsayCtrl.currentCow});
      this.cowsayCtrl.speak('hello');

      expect(this.cowsayCtrl.spoken).toEqual(expectedResult);
      expect(this.cowsayCtrl.history[0]).toEqual(expectedResult);
    });
  });

  describe('testing #undo()', () => {

    //6. Test that #undo works properly with 2 inputs
    it('should return empty array', () => {
      let expectedResult = '\n' + cowsay.say({text: 'hello', f: this.cowsayCtrl.currentCow});
      this.cowsayCtrl.speak('hello');
      this.cowsayCtrl.speak('hello again');
      this.cowsayCtrl.undo();
      expect(this.cowsayCtrl.spoken).toEqual(expectedResult);
      expect(this.cowsayCtrl.history.length).toEqual(0);
    });

    //7. Test that #undo works properly with 3 inputs
    it('should retun the second input hello2 ', () => {
      let expectedResult = '\n' + cowsay.say({text: 'hello2', f: this.cowsayCtrl.currentCow});
      this.cowsayCtrl.speak('hello1');
      this.cowsayCtrl.speak('hello2');
      this.cowsayCtrl.speak('hello3');
      this.cowsayCtrl.undo();
      expect(this.cowsayCtrl.spoken).toEqual(expectedResult);
    });

    //8. Test that #undo works properly with 4 inputs
    it('should retun the second input hello3 ', () => {
      let expectedResult = '\n' + cowsay.say({text: 'hello3', f: this.cowsayCtrl.currentCow});
      this.cowsayCtrl.speak('hello1');
      this.cowsayCtrl.speak('hello2');
      this.cowsayCtrl.speak('hello3');
      this.cowsayCtrl.speak('hello4');
      this.cowsayCtrl.undo();
      expect(this.cowsayCtrl.spoken).toEqual(expectedResult);
    });
  });

});
