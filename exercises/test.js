
// Write a JavaScript function that takes an array of numbers and returns a new array containing only unique numbers from the original array. Do not use built-in array methods such as filter or Set.

const { count } = require("console");

// Example: Input array: [1, 2, 3, 4, 4, 5, 6, 6,7] Expected result: [1, 2, 3, 5, 7]

function unique(arr) {
    const uniqueNumbers = [];
    const occurrences = {};
    let index = 0;
  
    for (let i = 0; i < arr.length; i++) {
      const num = arr[i];
      if (occurrences[num] === undefined) {
        occurrences[num] = 1;
      } else {
        occurrences[num]++;
      }
    }
    for (let i = 0; i < arr.length; i++) {
      const num = arr[i];
      if (occurrences[num] === 1) {
        uniqueNumbers[index] = num;
        index++;
      }
    }
    return uniqueNumbers;
  }
  
  let arr1 = [1, 2, 3, 4, 4, 5, 6, 6, 7]; //Expected result: [1, 2, 3, 5, 7]
  console.log(unique(arr1));
  
  // Write a JavaScript function that takes a string and returns a new string where all the words are reversed. Words in the string are separated by spaces. Do not use built-in string methods such as split or reverse.
  
  function reverse(string) {
    let result = "";
    let word = "";
  
    for (let i = 0; i < string.length; i++) {
      if (string[i] !== " ") {
        word = string[i] + word;
      } else {
        result += word + " ";
        word = "";
      }
    }
    return result + word;  
  }
  
  let input = "Hello world, how are you?";
  console.log(reverse(input));


  // Write a JavaScript function that takes an array of numbers and returns a new array containing only unique numbers from the original array. Do not use built-in array methods such as filter or Set.

// Example: Input array: [1, 2, 3, 4, 4, 5, 6, 6,7] Expected result: [1, 2, 3, 5, 7]

function test (arr) {
  let unique = [];
  arr.map((item)=>{
    let count = 0;
    for (let i = 0; i<arr.length;i++){
      if(arr[i] === item){
        count ++
      }
    }
    if(count===1){
      unique.push(item)
    }
  })
return unique
}

const num = [1, 2, 3, 4, 4, 5, 6, 6,7];
console.log(test(num));


  // Write a JavaScript function that takes a string and returns a new string where all the words are reversed. Words in the string are separated by spaces. Do not use built-in string methods such as split or reverse.
  
function stringW (str) {
  let newStr = str.split(" ").reverse().join(" ")
  return newStr
}

function reverse2 (str) {
  let word = "";
  let result2 = "";
  for (let i=str.length-1;i>=0;i--){
    if(str[i]===" "){
      
      result2 = result2 + word + " ";
      word = ""
    } else {
      word = str[i]+word;
      
    }
  }
  result2 = result2 + word
  return result2
}

let str = "Hello world, how are you?";
console.log(stringW(str));
console.log(reverse2(str));

let a = 1; // Initialize a with 1
let b = ++a; // Pre-increment a, then assign it to b
let c = a++; 
console.log(a); // Output: 3
console.log(b); // Output: 2
console.log(c); // Output: 2
