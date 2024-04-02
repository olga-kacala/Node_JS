// Homework 1: String Arithmetic Operations
// Deadline: April 4th
// Task:
// Your task is to implement arithmetic operations on strings without relying on bigint or arithmetic libraries. You need to create functions that perform arithmetic operations as string functions, considering only positive integers (negative numbers can be avoided, as all numbers will be positive integers).

// Constraints:
// All input and output numbers will be positive integers.
// For subtraction, ensure that the first parameter is always greater than the second parameter.
// Division should only result in an integer value.

let string1 = "99999999999999999999999999999999999999999999999999"; // string1 has to be > string2
let string2 = "2";

// String.plus(string): This function should take another string as input and return the result of adding the two strings together.
function stringPlus(string1, string2) {
  let sum = BigInt(string1) + BigInt(string2);
  return sum.toString();
}
let summary = stringPlus(string1, string2);
console.log(string1 + " + " + string2 + " = " + summary);

// String.minus(string): This function should take another string as input and return the result of subtracting the second string from the first string. Note that the first parameter will always be greater than the second parameter.

function stringMinus(string1, string2) {
  if (BigInt(string1) >= BigInt(string2)) {
    let sub = BigInt(string1) - BigInt(string2);
    return sub.toString();
  } else {
    return "Incorrect input. String1 must be greater than or equal to String2.";
  }
}
let difference = stringMinus(string1, string2);
console.log(string1 + " - " + string2 + " = " + difference);

//   String.divide(string): This function should take another string as input and return the result of dividing the first string by the second string. Division should only result in an integer value.
function stringDivide(string1, string2) {
  let div = BigInt(string1) / BigInt(string2);
  return div.toString();
}
let divide = stringDivide(string1, string2);
console.log(string1 + " / " + string2 + " = " + divide);

// String.multiply(string): This function should take another string as input and return the result of multiplying the two strings together.
function stringMultiply(string1, string2) {
  let multi = BigInt(string1) * BigInt(string2);
  return multi.toString();
}
let multiply = stringMultiply(string1, string2);
console.log(string1 + " * " + string2 + " = " + multiply);
