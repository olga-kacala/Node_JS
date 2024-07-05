
// Write a JavaScript function that takes an array of numbers and returns a new array containing only unique numbers from the original array. Do not use built-in array methods such as filter or Set.

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