function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = input.match(/[.\d\/]+/g) || ["1"]; // Default to 1 if no number is provided
    result = result[0];

    if(result.includes("/")) {
      let nums = result.split("/");
      if(nums.length != 2) {
        return "invalid number"; // Handle double fractions
      }
      result = parseFloat(nums[0]) / parseFloat(nums[1]);
    } else {
      result = parseFloat(result);
    }

    return isNaN(result) ? "invalid number" : result; // Ensure the result is a valid number
  };
  
  this.getUnit = function(input) {
    let result = input.match(/[a-zA-Z]+/g);
    if(result) {
      result = result[0].toLowerCase();
      switch(result) {
        case "gal":
        case "l":
        case "lbs":
        case "kg":
        case "mi":
        case "km":
          return result === "l" ? "L" : result;
        default:
          return "invalid unit";
      }
    }
    return "invalid unit";
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      gal: "L",
      L: "gal",
      lbs: "kg",
      kg: "lbs",
      mi: "km",
      km: "mi"
    };
    
    return unitMap[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const unitSpelling = {
      gal: "gallons",
      L: "liters",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometers"
    };
    
    return unitSpelling[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const conversionRates = {
      gal: galToL,
      L: 1 / galToL,
      lbs: lbsToKg,
      kg: 1 / lbsToKg,
      mi: miToKm,
      km: 1 / miToKm
    };
    
    let result = initNum * conversionRates[initUnit];
    
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;