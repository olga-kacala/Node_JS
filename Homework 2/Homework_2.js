// Homework 2
// Deadline: 15 April
// Task:
// Create a JavaScript library that provides advanced data transformation functions. The library should include the following features:

const AdvancedDataTransformation = {
  // addValues: Accepts two arguments of any type and performs the appropriate addition operation based on the types of the arguments. The function should return the result of the addition. If the addition is not possible, it should throw an error.

  addValues: function (x, y) {
    const argXtypeOf = typeof x;
    const argYtypeOf = typeof y;
    if (Array.isArray(x) && Array.isArray(y)) {
      if (x.length !== y.length) {
        throw new Error("Arrays must have the same length");
      }
      const newArr = [];
      for (let i = 0; i < x.length; i++) {
        newArr.push(x[i] + y[i]);
      }
      return newArr;
    }
    if (argXtypeOf === "object" && argYtypeOf === "object") {
      return this.deepMergeWithAddition(x, y);
    }
    if (argXtypeOf === argYtypeOf) {
      if (
        argXtypeOf === "number" ||
        argXtypeOf === "bigint" ||
        argXtypeOf === "string" ||
        argXtypeOf === "boolean"
      ) {
        return x + y;
      }
    }
    throw new Error(
      `Addition not possible for the given types: ${argXtypeOf} & ${argYtypeOf}`
    );
  },

  // stringifyValue: Accepts a single argument of any type and converts it to a string representation. For objects and arrays, use JSON.stringify() for serialization. For other types, use the appropriate built-in methods or operations to convert them to strings.

  stringifyValue: function (x) {
    if (typeof x === "undefined") {
      throw new Error("Unable convert undefined value to string");
    }
    if (typeof x === "object" || Array.isArray(x)) {
      return JSON.stringify(x);
    } else {
      return x.toString();
    }
  },

  // invertBoolean: Accepts a single boolean argument and returns its inverted value. If the argument is not a boolean, it should throw an error.

  invertBoolean: function (x) {
    const typeXof = typeof x;

    if (typeXof === "boolean") {
      return !x;
    } else {
      throw new Error("Argument not a boolean");
    }
  },

  // convertToNumber: Accepts a single argument of any type and attempts to convert it to a number. For strings, use parseFloat() or parseInt() for conversion. For other types, use appropriate operations or functions to perform the conversion. If the conversion is not possible, it should throw an error.

  convertToNumber: function (x) {
    const typeXof = typeof x;
    if (typeXof === "number") {
      return x;
    } else if (typeXof === "string") {
      if (x.includes(",") || x.includes(".")) {
        return parseFloat(x.replace(",", "."));
      } else {
        return parseFloat(x);
      }
    } else if (typeXof === "boolean") {
      return Number(x);
    } else {
      throw new Error("Conversion to number not possible");
    }
  },

  // coerceToType: Accepts two arguments: value and type. It attempts to convert the value to the specified type using type coercion. The function should return the coerced value if successful. If the coercion is not possible, it should throw an error.

  coerceToType: function (value, type) {
    if (type === "number") {
      return value;
    } else if (type === "string") {
      return String(value);
    } else if (type === "boolean") {
      return Boolean(value);
    } else if (type === "object") {
      return { value };
    } else if (type === "null") {
      return null;
    } else if (type === "undefined") {
      return undefined;
    } else {
      throw new Error(`Coercion not possible from ${value} to ${type}`);
    }
  },
  // (Optional) Implement additional functions of your choice that demonstrate advanced type conversion scenarios or cater to specific use cases related to primitive types. You are encouraged to explore complex scenarios and push the limits of type conversion.

  //deepMerge: performs deep merging of two objects.

  deepMergeWithAddition: function (obj1, obj2) {
    if (typeof obj1 !== "object" || typeof obj2 !== "object") {
      throw new Error("Inputs must be objects");
    }
    const mergedObj = {};
    // Merge keys from obj1
    for (let key in obj1) {
      if (obj1.hasOwnProperty(key)) {
        // If obj2 also has the key and both values are numbers, add them
        if (
          obj2.hasOwnProperty(key) &&
          typeof obj1[key] === "number" &&
          typeof obj2[key] === "number"
        ) {
          mergedObj[key] = obj1[key] + obj2[key];
        } else {
          mergedObj[key] = obj1[key]; // Otherwise, use value from obj1
        }
      }
    }
    // Merge keys from obj2 that are not in obj1
    for (let key in obj2) {
      if (obj2.hasOwnProperty(key) && !obj1.hasOwnProperty(key)) {
        mergedObj[key] = obj2[key];
      }
    }

    return mergedObj;
  },
};
module.exports = AdvancedDataTransformation;
