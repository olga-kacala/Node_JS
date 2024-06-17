// Your task is to implement arithmetic operations on strings without relying on bigint or arithmetic libraries. You need to create functions that perform arithmetic operations as string functions, considering only positive integers (negative numbers can be avoided, as all numbers will be positive integers).

// Constraints:
// All input and output numbers will be positive integers.
// For subtraction, ensure that the first parameter is always greater than the second parameter.
// Division should only result in an integer value.

const str1 = "100"; // string1 has to be > string2
const str2 = "2";

// String.plus(string): This function should take another string as input and return the result of adding the two strings together.

function string_plus(str1, str2) {
  let rev1 = str1.split("").reverse();
  let rev2 = str2.split("").reverse();
  let rev2prezero = rev2;
  for (let i = 1; i < str1.length; i++) {
    rev2prezero += "0";
  }
  let arr1 = [...rev1];
  let arr2 = [...rev2prezero];
  let sumarr = [arr1, arr2];

  const sum = sumarr[0].reduce(
    (acc, cur, ind) => {
      const a = cur;
      const b = sumarr[1][ind];
      const c = acc.leftover;
      const result = [a, b, c].map(Number).reduce(summary, 0);
      const newDigit = String(result).at(-1);
      const newDigits = [newDigit, ...acc.digits];
      const newLeftover = String(result).slice(0, -1);
      return { digits: newDigits, leftover: newLeftover };
    },
    {
      digits: [],
      leftover: 0,
    }
  );

  return sum.leftover + sum.digits.join("");
}
const summary = (a, c) => a + c;
// const ok = string_plus(str1, str2);
// console.log(ok);

// String.minus(string): This function should take another string as input and return the result of subtracting the second string from the first string. Note that the first parameter will always be greater than the second parameter.

const StringMinus = (str1, str2) => {
  const maxLength = str1.length > str2.length ? str1.length : str2.length;
  str1 = str1.padStart(maxLength, "0");
  str2 = str2.padStart(maxLength, "0");

  let borrow = 0;
  result = "";

  for (let i = maxLength - 1; i >= 0; i--) {
    const digit1 = str1[i].charCodeAt(0) - "0".charCodeAt(0);
    const digit2 = str2[i].charCodeAt(0) - "0".charCodeAt(0);
    let diff = digit1 - digit2 - borrow;

    if (diff < 0) {
      borrow = 1;
      diff += 10;
    }
    let charDiff = String.fromCharCode(diff + "0".charCodeAt(0));
    result = charDiff + result;
  }
  result = result.replace(/^0+/, "");
  return result || "0";
};
// console.log(StringMinus(str1, str2))

// String.multiply(string): This function should take another string as input and return the result of multiplying the two strings together.

const stringMultipy = (str1, str2) => {
  const l1 = str1.length;
  const l2 = str2.length;

  let s1 = str1.split("").map(Number);
  let s2 = str2.split("").map(Number);

  let result = new Array(l1 + l2).fill(0);

  for (let i = l1 - 1; i >= 0; i--) {
    for (let j = l2 - 1; j >= 0; j--) {
      let multi = s1[i] * s2[j];
      let sum = multi + result[i + j + 1];
      result[i + j] = (sum / 10) | 0;
      result[i + j + 1] = sum % 10;
    }
  }
  return result.join("").replace(/^0+/, "") || 0;
};

// console.log(stringMultipy(str1, str2));

//   String.divide(string): This function should take another string as input and return the result of dividing the first string by the second string. Division should only result in an integer value.

// addValues: Accepts two arguments of any type and performs the appropriate addition operation based on the types of the arguments. The function should return the result of the addition. If the addition is not possible, it should throw an error.

const addValues = (x, y) => {
  const typeOfX = typeof x;
  const typeOfY = typeof y;

  if (Array.isArray(x) && Array.isArray(y)) {
    if (x.length !== y.length) {
      throw new Error("nok");
    }
    const newArr = [];
    for (let i = 0; i < x.length; i++) {
      newArr.push(x[i] + y[i]);
    }
    return newArr;
  } else if (typeOfX === "object" && typeOfY === "object") {
    return this.deepMergeWithAddition(x, y);
  }
  if (typeOfX === typeOfY) {
    if (
      typeOfX === "number" ||
      typeOfX === "bigInt" ||
      typeOfX === "boolean" ||
      typeOfX === "string"
    ) {
      return x + y;
    }
  } else {
    throw new Error("not possible");
  }
};
// console.log(addValues([1,2,3],[1,1,"1"]))

// Implement a pure function called calculateDiscountedPrice that takes an array of products and a discount percentage as arguments. The function should return a new array of products with discounted prices based on the given percentage, without modifying the original products.

function pure(products, discount) {
  return products.map((item) => {
    const disc = (item.price * discount) / 100;
    return { ...item, price: disc };
  });
}
const pr = [
  { name: "Product 1", price: 100 },
  { name: "Product 2", price: 50 },
  { name: "Product 3", price: 200 },
];
const dis = 50;
// console.log(pure(pr, dis));

// Create a pure function called calculateTotalPrice that takes an array of products as an argument. The function should return the total price of all products, without modifying the original array or its items.
function pure2(products) {
  return products.reduce((acc, curr) => acc + curr.price, 0);
}
function pure3(products) {
  let sum = 0;
  for (let i = 0; i < products.length; i++) {
    sum += products[i].price;
  }
  return sum;
}
// console.log(pure2(pr));
// console.log(pure3(pr));

// Implement a function called getFullName that takes a person object with firstName and lastName properties. The function should return the person's full name in the format "FirstName LastName".

const person = { firstName: "Ola", lastName: "Ka" };

function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}

// console.log(getFullName(person));

// Create a function called filterUniqueWords that takes a string of text and returns an array of unique words, sorted in alphabetical order, without using explicit loops. Use function composition and point-free style.

function getWord(string) {
  return string.toLowerCase().split(" ");
}
function filter(arr) {
  return [...new Set(arr)];
}
function sort(arr) {
  return arr.sort();
}

function result(text) {
  return sort(filter(getWord(text)));
}

const string = "Zosia ma bota ma ma";
// console.log(result(string));

// Implement a function called getAverageGrade that takes an array of student objects, each containing a name and grades property. The function should return the average grade of all students, without modifying the original array or its items. Use function composition and point-free style.

const students = [
  { name: "Ala", grades: [1, 5] },
  { name: "Tom", grades: [1, 1] },
  { name: "Ola", grades: [2, 2] },
];

function getAvg(arr) {
  return (
    arr
      .map((student) => student.grades)
      .flat()
      .reduce((sum, grade) => sum + grade, 0) /
    arr.map((student) => student.grades).flat().length
  );
}
// console.log(getAvg(students));

// Task 3: Closures and Higher-Order Functions

// Create a function called createCounter that returns a closure. The closure should be a counter function that increments the count on each call and returns the updated count. Each closure should have its own independent count.

function createCounter() {
  let counter = 1;
  const inner = () => {
    return counter++;
  };
  return inner;
}
// Creating independent counters
const counter1 = createCounter();
const counter2 = createCounter();

// console.log(counter1()); // Output: 1
// console.log(counter1()); // Output: 2
// console.log(counter2()); // Output: 1
// console.log(counter2()); // Output: 2
// console.log(counter1()); // Output: 3
// console.log(counter2()); // Output: 3

// Implement a higher-order function called repeatFunction that takes a function and a number as arguments. The function should return a new function that invokes the original function multiple times based on the provided number. If the number is negative, the new function should invoke the original function indefinitely until stopped.
function repeatFunction(fun, num) {
  if (num >= 0) {
    for (let i = 0; i < num; i++) {
      fun();
    }
  } else {
    while (true) {
      fun();
    }
  }
}

// Task 4: Recursion and Tail Call Optimization

// Implement a recursive function called calculateFactorial that calculates the factorial of a given number. Optimize the function to use tail call optimization to avoid stack overflow for large input numbers.
function calculateFactorial (num, acc =1){
  if(num<=1){
    return acc
  } 
   return calculateFactorial(num-1, acc *num)
  
}
// console.log(calculateFactorial(3))
// Create a recursive function called power that takes a base and an exponent as arguments. The function should calculate the power of the base to the exponent using recursion.
function power (num, ex){
  if(ex ===0){
    return 1
  } else {
    return num * power(num, ex -1)
  } 

}

console.log(power(2,3))

// Task 5: Lazy Evaluation and Generators (*do not use yield)

// Implement a lazy evaluation function called lazyMap that takes an array and a mapping function. The function should return a lazy generator that applies the mapping function to each element of the array one at a time.

// Create a lazy generator function called fibonacciGenerator that generates Fibonacci numbers one at a time using lazy evaluation.
