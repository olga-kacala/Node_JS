// Homework 1: String Arithmetic Operations
// Deadline: April 4th
// Task:
// Your task is to implement arithmetic operations on strings without relying on bigint or arithmetic libraries. You need to create functions that perform arithmetic operations as string functions, considering only positive integers (negative numbers can be avoided, as all numbers will be positive integers).

// Constraints:
// All input and output numbers will be positive integers.
// For subtraction, ensure that the first parameter is always greater than the second parameter.
// Division should only result in an integer value.

const str1 = "111111111111111111111111111111111111111111"; // string1 has to be > string2
const str2 = "9";

function homeworkPlusMinus(string1, string2, operation) {
  const longerStringLength =
    string1.length > string2.length ? string1.length : string2.length;
  const strings = [string1, string2].map((item) =>
    item.padStart(longerStringLength, "0").split("").reverse()
  );

  const res = strings[0].reduce(
    (acc, cur, ind) => {
      const a = cur;
      const b = strings[1][ind];
      const c = acc.leftover;
      const sum = [a, b, c].map(Number).reduce(operation, 0);
      const newDigit = String(sum).at(-1);
      const newDigits = [newDigit, ...acc.digits];
      const newLeftover = String(sum).slice(0, -1);
      return { digits: newDigits, leftover: newLeftover };
    },
    {
      digits: [],
      leftover: 0,
    }
  );

  return res.leftover + res.digits.join("");
}

// String.plus(string): This function should take another string as input and return the result of adding the two strings together.

const stringPlus = (a, c) => a + c;

// String.minus(string): This function should take another string as input and return the result of subtracting the second string from the first string. Note that the first parameter will always be greater than the second parameter.

const stringMinus = (a, c, i) => {
  if (i === 0) {
    return c;
  }
  return a - c;
};

//   String.divide(string): This function should take another string as input and return the result of dividing the first string by the second string. Division should only result in an integer value.

function homeworkDivide(string1, string2) {
  if (string2 === "0") {
    return "Infinity"; // Or any other suitable indication for division by zero
  }

  const num1 = string1.split("").map(Number);
  const num2 = string2.split("").map(Number);
  const len1 = num1.length;
  const len2 = num2.length;

  if (len1 < len2 || (len1 === len2 && string1 < string2)) {
    return "0"; // If string1 < string2, division result will be 0
  }

  const result = [];
  let dividend = num1.slice();
  let divisor = num2.slice();

  while (isGreaterOrEqual(dividend, divisor)) {
    let quotientDigit = 0;
    while (isGreaterOrEqual(dividend, divisor)) {
      quotientDigit++;
      dividend = subtract(dividend, divisor);
    }
    result.push(quotientDigit);
    divisor.unshift(0); // Shift divisor left to match dividend length
  }

  return result.join("").replace(/^0+/, "") || "0";
}

function isGreaterOrEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return arr1.length > arr2.length;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return arr1[i] > arr2[i];
    }
  }
  return true; // arr1 === arr2
}

function subtract(arr1, arr2) {
  const result = [];
  let borrow = 0;

  for (let i = 0; i < arr1.length; i++) {
    let diff = arr1[i] - (arr2[i] || 0) - borrow;
    if (diff < 0) {
      diff += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }
    result.push(diff);
  }

  return result;
}

// String.multiply(string): This function should take another string as input and return the result of multiplying the two strings together.

function homeworkMulti(string1, string2) {
  const num1 = string1.split("").map(Number);
  const num2 = string2.split("").map(Number);
  const len1 = num1.length;
  const len2 = num2.length;

  const result = new Array(len1 + len2).fill(0);

  for (let i = len1 - 1; i >= 0; i--) {
    for (let j = len2 - 1; j >= 0; j--) {
      const product = num1[i] * num2[j];
      const sum = product + result[i + j + 1];
      result[i + j] += (sum / 10) | 0;
      result[i + j + 1] = sum % 10;
    }
  }
  return result.join("").replace(/^0+/, "") || "0";
}

const plus = homeworkPlusMinus(str1, str2, stringPlus);
console.log(`${str1} + ${str2} = ${plus}`);

const minus = homeworkPlusMinus(str1, str2, stringMinus);
console.log(`${str1} - ${str2} = ${minus}`);

const divide = homeworkDivide(str1, str2);
console.log(`${str1} / ${str2} = ${divide}`);

const multiply = homeworkMulti(str1, str2);
console.log(`${str1} * ${str2} = ${multiply}`);
