// Homework 1: String Arithmetic Operations
// Deadline: April 4th
// Task:
// Your task is to implement arithmetic operations on strings without relying on bigint or arithmetic libraries. You need to create functions that perform arithmetic operations as string functions, considering only positive integers (negative numbers can be avoided, as all numbers will be positive integers).

// Constraints:
// All input and output numbers will be positive integers.
// For subtraction, ensure that the first parameter is always greater than the second parameter.
// Division should only result in an integer value.

const str1 = "12345"; // string1 has to be > string2
const str2 = "12345";

// String.plus(string): This function should take another string as input and return the result of adding the two strings together.

function homeworkPlus(string1, string2) {
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
      const sum = [a, b, c].map(Number).reduce(stringPlus, 0);
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
const stringPlus = (a, c) => a + c;

// String.minus(string): This function should take another string as input and return the result of subtracting the second string from the first string. Note that the first parameter will always be greater than the second parameter.

function stringMinus(str1, str2) {
  // Pad the shorter string with zeros on the left to match the length of the longer string
  const maxLength = Math.max(str1.length, str2.length);
  str1 = str1.padStart(maxLength, "0");
  str2 = str2.padStart(maxLength, "0");

  let result = "";
  let borrow = 0;

  // Iterate through the digits from right to left
  for (let i = maxLength - 1; i >= 0; i--) {
    const digit1 = str1[i];
    const digit2 = str2[i];

    // Subtract the digits and borrow
    let diff =
      digit1.charCodeAt(0) -
      "0".charCodeAt(0) -
      (digit2.charCodeAt(0) - "0".charCodeAt(0)) -
      borrow;

    // If the result is negative, borrow from the next digit
    if (diff < 0) {
      diff += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }

    // Convert the result back to character
    const charResult = String.fromCharCode(diff + "0".charCodeAt(0));

    // Append the result to the left of the string
    result = charResult + result;
  }

  // Trim leading zeros
  result = result.replace(/^0+/, "");

  return result || "0"; // Return '0' if result is empty
}

// String.multiply(string): This function should take another string as input and return the result of multiplying the two strings together.

function stringMultiply(string1, string2) {
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

//   String.divide(string): This function should take another string as input and return the result of dividing the first string by the second string. Division should only result in an integer value.

function stringDivide(string1, string2) {
  if (string2 === "0") {
    return "Infinity";
  }

  const num1 = string1.split("").map(Number);
  const num2 = string2.split("").map(Number);
  const len1 = num1.length;
  const len2 = num2.length;

  if (len1 < len2 || (len1 === len2 && string1 < string2)) {
    return "0"; // If string1 < string2, division result will be 0
  }

  // Pad string2 with zeros on the left until its length matches string1
  while (num2.length < len1) {
    num2.unshift(0);
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
  }

  return result.join("").replace(/^0+/, "") || "0";
}

function isGreaterOrEqual(arr1, arr2) {
  // if (arr1.length !== arr2.length) {
  //   return arr1.length > arr2.length;
  // }
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

  for (let i = arr1.length - 1; i >= 0; i--) {
    let diff = arr1[i] - (arr2[i] || 0) - borrow;
    if (diff < 0) {
      diff += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }
    result.unshift(diff);
  }

  return result;
}

const plus = homeworkPlus(str1, str2, stringPlus);
console.log(`${str1} + ${str2} = ${plus}`);

const minus = stringMinus(str1, str2);
console.log(`${str1} - ${str2} = ${minus}`);

const multiply = stringMultiply(str1, str2);
console.log(`${str1} * ${str2} = ${multiply}`);

const divide = stringDivide(str1, str2);
console.log(`${str1} / ${str2} = ${divide}`);

String.prototype.plus = function (otherString) {
  return homeworkPlus(this.toString(), otherString.toString(), stringPlus);
};

String.prototype.minus = function (otherString) {
  return stringMinus(this.toString(), otherString.toString());
};

String.prototype.multiply = function (otherString) {
  return stringMultiply(this.toString(), otherString.toString());
};

String.prototype.divide = function (otherString) {
  return stringDivide(this.toString(), otherString.toString());
};

console.log(
  "plus:" +
    "90099999999999999999900999999999999999999009999999999999999990099999999999999999".plus(
      "900999999999999999999009999999999999999990099999999999999999900999999999999999999009999999999999999990099999999999999999"
    )
);
console.log(
  "minus:" +
    "90099999999999999999900999999999999999999009999999999999999990099999999999999999".minus(
      "9009999999999999999990099999999999999999900999999999999999999009999999999999999"
    )
);

console.log(
  "multi:" +
    "9009999999999999999990099999999999999999".multiply(
      "90099999999999999999900999999999999999999009999999999999999990099999999999999999900999999999999999999009999999999999999990099999999999999999900999999999999999999009999999999999999990099999999999999999"
    )
);

console.log(
  "divide: " +
    "222222222222222222222222222222222222222222222222222222222222222222".divide(
      "2"
    )
);
