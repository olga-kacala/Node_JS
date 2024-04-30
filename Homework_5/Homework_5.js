// Homework 5
// Deadline: 2 May

// Task 1: Advanced Array Filtering
// Create a function called customFilterUnique that takes an array and a callback function as arguments. The customFilterUnique function should filter the array using the callback function to determine uniqueness. The resulting array should contain only unique elements based on the callback's logic.
// Use the customFilterUnique function to filter an array of objects based on a specific property and return only unique objects.

function customFilterUnique(arr, callback) {
  const uniqueArr = [];
  const count = {};

  arr.forEach((item) => {
    const callbackKey = callback(item);
    if (count[callbackKey] === undefined) {
      count[callbackKey] = 1;
    } else {
      count[callbackKey]++;
    }
  });
  arr.forEach((item) => {
    const callbackKey = callback(item);
    if (count[callbackKey] === 1) {
      uniqueArr.push(item);
    }
  });

  return uniqueArr;
}

const arr11 = [
  { id: 1, name: "test" },
  { id: 2, name: "foo" },
  { id: 3, boo: 3 },
  { id: 2, isAdmin: false },
];

const arr22 = [1, 2, "a", "b", 2, "b", 3];

const persons = [
  { key: 1, name: "John" },
  { key: 2, name: "Alice" },
  { key: 3, name: "Adam" },
  { key: 4, name: "Adam" },
  { key: 5, name: "Alice" },
  { key: 6, name: "Adam" },
  { key: 6, name: "Adam" },
];

// console.log(customFilterUnique(persons, (person) => person.name));
// console.log(customFilterUnique(persons, (person) => person.key));

// console.log(customFilterUnique(arr11, (el) => el.id));
// console.log(customFilterUnique(arr22, (el) => el));

// Task 2: Array Chunking
// Create a function called chunkArray that takes an array and a chunk size as arguments. The chunkArray function should divide the array into smaller arrays, each containing elements of the specified chunk size. The function should return an array of arrays.
// Optimize the chunkArray function to minimize memory usage while chunking the array.

function chunkArray(arr, chunk) {
  const resultArr = [];
  for (let i = 0; i < arr.length; i += chunk) {
    resultArr.push(arr.slice(i, chunk + i));
  }
  return resultArr;
}

const arrayToChunk = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const chunkSize = 4;

// console.log(chunkArray(arrayToChunk, chunkSize));

// Task 3: Array Shuffling
// Create a function called customShuffle that takes an array as an argument and returns a new array with its elements randomly shuffled.
// Implement the customShuffle function using an efficient shuffling algorithm to achieve uniform randomness.

function customShuffle(arr) {
  const shuffledArr = [...arr];
  for (let i = 0; i < arr.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }
  return shuffledArr;
}

const list = [
  { key: 1, name: "John" },
  { key: 2, name: "Alice" },
  { key: 3, name: "Adam" },
  { key: 4, name: "Oliver" },
  { key: 5, name: "George" },
  { key: 6, name: "Billy" },
];

// console.log(customShuffle(list));

// Task 4: Array Intersection and Union
// Create a function called getArrayIntersection that takes two arrays as arguments and returns a new array containing the common elements between the two arrays.
// Create a function called getArrayUnion that takes two arrays as arguments and returns a new array containing all unique elements from both arrays, without any duplicates.

function getArrayIntersection(arr1, arr2) {
  const commonArr = [];
  const result = [];
  arr1.forEach((item) => {
    if (!commonArr.includes(item)) {
      commonArr.push(item);
    }
  });
  commonArr.forEach((item) => {
    if (arr2.includes(item)) {
      result.push(item);
    }
  });
  return result;
}

function getArrayUnion(arr1, arr2) {
  const combinedArray = arr1.concat(arr2);
  const uniqueArray = [...new Set(combinedArray)];
  return uniqueArray;
}

let array1 = [1, 2, 3, 4, 5, 2, "a"];
let array2 = ["a", "b", "c", 2, "d", "c", 3];

console.log(getArrayIntersection(array1, array2));
console.log(getArrayUnion(array1, array2));

// Task 5: Array Performance Analysis
// Implement a function called measureArrayPerformance that takes a function and an array as arguments. The measureArrayPerformance function should execute the provided function with the given array as input and measure the execution time.
// Use the measureArrayPerformance function to compare the performance of built-in array methods (map, filter, reduce, etc.) against your custom array manipulation functions.

function measureArrayPerformance(func, arr) {
  const startTime = performance.now();
  func(arr);
  const endTime = performance.now();
  const executionTime = endTime - startTime;
  return executionTime;
}

const array = [1, 2, 3, 4, 5];

// const mapExecutionTime = measureArrayPerformance(arr => arr.map(x => x * 2), array);
// console.log(`Map Execution Time: ${mapExecutionTime} milliseconds`);

// const filterExecutionTime = measureArrayPerformance(arr => arr.filter(x => x % 2 === 0), array);
// console.log(`Filter Execution Time: ${filterExecutionTime} milliseconds`);

// const customExecutionTime = measureArrayPerformance(customShuffle, array);
// console.log(`Custom shuffle Execution Time: ${customExecutionTime} milliseconds`);
