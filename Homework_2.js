// Homework 2
// Deadline: 15 April
// Task:
// Create a JavaScript library that provides advanced data transformation functions. The library should include the following features:

const AdvancedDataTransformation = {
  // addValues: Accepts two arguments of any type and performs the appropriate addition operation based on the types of the arguments. The function should return the result of the addition. If the addition is not possible, it should throw an error.
  addValues: function (x, y) {
    const argXtypeOf = typeof x;
    const argYtypeOf = typeof y;

    if (argXtypeOf === "number"  && argYtypeOf === "number") {
      return x + y;
    }
      else if (argXtypeOf === "bigint"  && argYtypeOf === "bigint") {
        return x + y;
    } else if (Array.isArray(x) && Array.isArray(y)) {
        x.forEach(element => {

            
        });
      return x.concat(y);;
    } else {
      throw new Error(
        `Addition not possible for the given types: ${argXtypeOf} & ${argYtypeOf}`
      );
    }
  },

  // stringifyValue: Accepts a single argument of any type and converts it to a string representation. For objects and arrays, use JSON.stringify() for serialization. For other types, use the appropriate built-in methods or operations to convert them to strings.
  stringifyValue: function (x) {
    const typeXof = typeof x;

    if (typeXof === "string") {
      return x;
    } else if (
      typeXof === "number" ||
      typeXof === "bigint" ||
      typeXof === "function" ||
      typeXof === "symbol" ||
      typeXof === "undefined"
    ) {
      return String(x);
    } else if (typeXof === "boolean") {
      return x === true ? "true" : "false";
    } else if (typeXof === "object" || Array.isArray(x)) {
      const stringResult = JSON.stringify(x);
      return stringResult;
    }
  },
  // invertBoolean: Accepts a single boolean argument and returns its inverted value. If the argument is not a boolean, it should throw an error.

  // convertToNumber: Accepts a single argument of any type and attempts to convert it to a number. For strings, use parseFloat() or parseInt() for conversion. For other types, use appropriate operations or functions to perform the conversion. If the conversion is not possible, it should throw an error.

  // coerceToType: Accepts two arguments: value and type. It attempts to convert the value to the specified type using type coercion. The function should return the coerced value if successful. If the coercion is not possible, it should throw an error.

  // (Optional) Implement additional functions of your choice that demonstrate advanced type conversion scenarios or cater to specific use cases related to primitive types. You are encouraged to explore complex scenarios and push the limits of type conversion.
};

function functionExample() {
  return "Suprise! I am a function";
}

// Test cases

// console.log("Add values: strings, numbers and bigINt");
// console.log(AdvancedDataTransformation.addValues(5, 10));
// console.log(AdvancedDataTransformation.addValues("5", 10));
// console.log(AdvancedDataTransformation.addValues("Homework 2", " is fun"));
// console.log(
//   AdvancedDataTransformation.addValues(
//     9999999999999999999999999999999999,
//     "5"
//   )
// );

// console.log("Add values: arrays");
// console.log(AdvancedDataTransformation.addValues([1, 2], [3, 4]));

// console.log("Add values: objects");
// console.log(AdvancedDataTransformation.addValues({ a: 1 }, { b: 2 }));

// console.log("Add values: errors");
// console.log(AdvancedDataTransformation.addValues(true, false));
// console.log(AdvancedDataTransformation.addValues(true, 1));
// console.log(AdvancedDataTransformation.addValues(Symbol("foo"), Symbol("bar")));

console.log("String convertion: ");
console.log(AdvancedDataTransformation.stringifyValue("word"));
console.log(typeof AdvancedDataTransformation.stringifyValue("word"));
console.log(AdvancedDataTransformation.stringifyValue(11));
console.log(typeof AdvancedDataTransformation.stringifyValue(11));
console.log(
  AdvancedDataTransformation.stringifyValue(
    BigInt(
      999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    )
  )
);
console.log(
  typeof AdvancedDataTransformation.stringifyValue(
    BigInt(
      999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    )
  )
);
console.log(AdvancedDataTransformation.stringifyValue([1, 2]));
console.log(typeof AdvancedDataTransformation.stringifyValue([1, 2]));
console.log(AdvancedDataTransformation.stringifyValue({ a: 1, b: 2 }));
console.log(typeof AdvancedDataTransformation.stringifyValue({ a: 1, b: 2 }));
console.log(AdvancedDataTransformation.stringifyValue(true));
console.log(typeof AdvancedDataTransformation.stringifyValue(true));
console.log(AdvancedDataTransformation.stringifyValue(false));
console.log(typeof AdvancedDataTransformation.stringifyValue(false));
console.log(AdvancedDataTransformation.stringifyValue(functionExample));
console.log(typeof AdvancedDataTransformation.stringifyValue(functionExample));
console.log(AdvancedDataTransformation.stringifyValue(Symbol("foo")));
console.log(typeof AdvancedDataTransformation.stringifyValue(Symbol("foo")));
console.log(AdvancedDataTransformation.stringifyValue(undefined));
console.log(typeof AdvancedDataTransformation.stringifyValue(undefined));
