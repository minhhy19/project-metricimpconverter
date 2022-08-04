function numberStringSplitter(input) {
  let number = input.match(/[.\d\/]+/g) || ["1"];
  let string = input.match(/[a-zA-Z]+/g)[0];

  return [number[0], string];
}

function convertFractionalToDecimal(input) {
  let nums = input.split("/");
  if (nums.length > 2) {
    return false;
  }
  let num2 = nums[1] || "1";
  return parseFloat(nums[0]) / parseFloat(num2);
}

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = numberStringSplitter(input)[0];
    
    return convertFractionalToDecimal(result);
  };
  
  this.getUnit = function(input) {
    let result = numberStringSplitter(input)[1].toLowerCase();
    const mapToUnit = {
      gal: 'gal',
      l: 'L',
      mi: 'mi',
      km: 'km',
      lbs: 'lbs',
      kg: 'kg'
    }
    return mapToUnit[result];
  };
  
  this.getReturnUnit = function(initUnit) {
    let unitInput = initUnit.toLowerCase();;
    const mapToReturnUnit = {
      gal: 'L',
      l: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    }
    return mapToReturnUnit[unitInput];
  };
  
  this.spellOutUnit = function(unit) {
    const mapToSpellOutUnit = {
      gal: 'gallons',
      l: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    }
    return mapToSpellOutUnit[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowerCase();
    const convert = {
      gal: initNum * galToL,
      l: initNum / galToL,
      mi: initNum * miToKm,
      km: initNum / miToKm,
      lbs: initNum * lbsToKg,
      kg: initNum / lbsToKg
    }

    let outNum = convert[unit];
    return parseFloat(outNum.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
