const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Function ConvertHandler.getNum(input)', function() {
    test('Whole number input', function(done) {
      let input = '3kg';
      assert.equal(convertHandler.getNum(input), 3);
      done();
    });

    test('Decimal input', function(done) {
      let input = '3.5kg';
      assert.equal(convertHandler.getNum(input), 3.5);
      done();
    });

    test('Fractional input', function(done) {
      let input = '5/3kg';
      assert.equal(convertHandler.getNum(input), 5 / 3);
      done();
    });

    test('Fractional input with a decimal', function(done) {
      let input = '5/3.5kg';
      assert.equal(convertHandler.getNum(input), 5 / 3.5);
      done();
    });

    test('Error on a double-fraction', function(done) {
      let input = '5/3/5kg';
      assert.equal(convertHandler.getNum(input), false);
      done();
    });

    test('Error on a double-fraction', function(done) {
      let input = '5/3/5kg';
      assert.equal(convertHandler.getNum(input), false);
      done();
    });

    test('No numerical input', function(done) {
      let input = 'kg';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });
  
  suite("Function convertHandler.getUnit(input)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      let input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG",
      ];
      let output = [
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
      ];
      input.forEach(function (ele, index) {
        assert.equal(convertHandler.getUnit(ele), output[index]);
      });
      done();
    });

    test('Invalid input unit', function(done) {
      let input = '32kgg';
      assert.equal(convertHandler.getUnit(input), undefined);
      done();
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let expect = ["L", "gal", "km", "mi", "kg", "lbs"];
      input.forEach(function (ele, index) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[index]);
      });
      done();
    });
  });
  
  suite("Function convertHandler.convert(initNum, initUnit)", function () {
    test("Gal to L", function (done) {
      let initNum = 5;
      let initUnit = 'gal';
      let expected = 18.92705;
      assert.approximately(convertHandler.convert(initNum, initUnit), expected, 0.1);
      done();
    });

    test("L to gal", function (done) {
      let initNum = 5;
      let initUnit = 'l';
      let expected = 1.32086;
      assert.approximately(convertHandler.convert(initNum, initUnit), expected, 0.1);
      done();
    });

    test("Mi to km", function (done) {
      let initNum = 10;
      let initUnit = 'mi';
      let expected = 16.0934;
      assert.approximately(convertHandler.convert(initNum, initUnit), expected, 0.1);
      done();
    });

    test("Km to mi", function (done) {
      let initNum = 10;
      let initUnit = 'km';
      let expected = 6.21373;
      assert.approximately(convertHandler.convert(initNum, initUnit), expected, 0.1);
      done();
    });

    test("Lbs to kg", function (done) {
      let initNum = 15;
      let initUnit = 'lbs';
      let expected = 6.80388;
      assert.approximately(convertHandler.convert(initNum, initUnit), expected, 0.1);
      done();
    });

    test("Kg to lbs", function (done) {
      let initNum = 15;
      let initUnit = 'kg';
      let expected = 33.06936;
      assert.approximately(convertHandler.convert(initNum, initUnit), expected, 0.1);
      done();
    });
  });
});