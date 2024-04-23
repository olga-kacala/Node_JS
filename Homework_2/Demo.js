const AdvancedDataTransformation = require("./Homework_2");

// Test cases

// console.log("Add values: strings, numbers and bigINt");
// console.log(AdvancedDataTransformation.addValues(5, 10));
// console.log(AdvancedDataTransformation.addValues(BigInt(5), BigInt(10)));
console.log(AdvancedDataTransformation.addValues("Homework 2", " is fun"));
// console.log(AdvancedDataTransformation.addValues([1, 2], [3, 4]));
// console.log(AdvancedDataTransformation.addValues({ a: 1 }, { b: 2 }));
// console.log(AdvancedDataTransformation.addValues(true, false));
// console.log(AdvancedDataTransformation.addValues(true, 1));
// console.log(AdvancedDataTransformation.addValues(Symbol("foo"), Symbol("bar")));

// console.log(AdvancedDataTransformation.addValues(NaN, NaN));

// console.log("String convertion: ");
// console.log(AdvancedDataTransformation.stringifyValue("word"));
// console.log(typeof AdvancedDataTransformation.stringifyValue("word"));
// console.log(AdvancedDataTransformation.stringifyValue(11));
// console.log(typeof AdvancedDataTransformation.stringifyValue(11));
// console.log(
//   AdvancedDataTransformation.stringifyValue(
//     BigInt(
//       999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
//     )
//   )
// );
// console.log(
//   typeof AdvancedDataTransformation.stringifyValue(
//     BigInt(
//       999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
//     )
//   )
// );
// console.log(AdvancedDataTransformation.stringifyValue([1, 2]));
// console.log(typeof AdvancedDataTransformation.stringifyValue([1, 2]));
// console.log(AdvancedDataTransformation.stringifyValue({ a: 1, b: 2 }));
// console.log(typeof AdvancedDataTransformation.stringifyValue({ a: 1, b: 2 }));
// console.log(AdvancedDataTransformation.stringifyValue(true));
// console.log(typeof AdvancedDataTransformation.stringifyValue(true));
// console.log(AdvancedDataTransformation.stringifyValue(false));
// console.log(typeof AdvancedDataTransformation.stringifyValue(false));
// function functionExample() {
//   return "Suprise! I am a function";
// }
// console.log(AdvancedDataTransformation.stringifyValue(functionExample));
// console.log(typeof AdvancedDataTransformation.stringifyValue(functionExample));
// console.log(AdvancedDataTransformation.stringifyValue(Symbol("foo")));
// console.log(typeof AdvancedDataTransformation.stringifyValue(Symbol("foo")));
// console.log(AdvancedDataTransformation.stringifyValue(undefined));
// console.log(typeof AdvancedDataTransformation.stringifyValue(undefined));
// console.log(AdvancedDataTransformation.stringifyValue(null));
// console.log(typeof AdvancedDataTransformation.stringifyValue(null));
// console.log(AdvancedDataTransformation.stringifyValue(NaN));
// console.log(typeof AdvancedDataTransformation.stringifyValue(NaN));

// console.log("Invert to boolean: ");
// console.log(AdvancedDataTransformation.invertBoolean(true));

// console.log("Convert to number: ");
// console.log(AdvancedDataTransformation.convertToNumber('3,14'))
// console.log(AdvancedDataTransformation.convertToNumber('3.14'))
// console.log(AdvancedDataTransformation.convertToNumber(true))
// console.log(AdvancedDataTransformation.convertToNumber(false))

// console.log("Coerce to type: ");
// console.log(AdvancedDataTransformation.coerceToType(10.9, 'string'))
// console.log(AdvancedDataTransformation.coerceToType(11, 'null'));
// console.log(AdvancedDataTransformation.coerceToType(11, 'undefined'));
// console.log(AdvancedDataTransformation.coerceToType(11, 'object'))
// console.log(AdvancedDataTransformation.coerceToType(0, 'boolean'))
// console.log(AdvancedDataTransformation.coerceToType(1, 'boolean'))
// console.log(AdvancedDataTransformation.coerceToType(null, 'boolean'))
// console.log(AdvancedDataTransformation.coerceToType(20, 'boolean'))
// console.log(typeof(AdvancedDataTransformation.coerceToType(11, 'object')))

// console.log("Let's have fun with advanced type conversion: ");
// const obj1 = { a: 99, b: 1, c: 2 };
// const obj2 = { a: 8, b: 7, e: 4 };
// const mergedObj = AdvancedDataTransformation.deepMergeWithAddition(obj1, obj2);
// console.log(mergedObj);
