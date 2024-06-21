const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  email: "john.doe@example.com",
};

// Use property descriptors to make all properties of the person object read-only and non-writable, so their values cannot be changed directly.

Object.keys(person).forEach((key) => {
  Object.defineProperty(person, key, {
    value: person[key],
    writable: false,
    enumerable: true,
    configurable: true,
  });
});

// Implement a method called updateInfo on the person object that takes a new info object as an argument. The info object should contain updated values for any of the properties (e.g., { firstName: "Jane", age: 32 }). Ensure that this method adheres to the read-only property descriptor set earlier.
const newPerson = { firstName: "Jane", age: 55 };

// person.updateInfo = function (newInfo) {
//     Object.keys(newInfo).forEach((key)=>{
//         if(this.hasOwnProperty(key)){
// if(!Object.getOwnPropertyDescriptor(this, key).writable){
// Object.defineProperty(this, key,{
//     value: this[key],
//     writable: true,
//     enumerable: true,
//     configurable: true,
// })
// this[key]= newInfo[key];
// Object.defineProperty(this, key,{
//     value: this[key],
//     writable: false,
//     enumerable: true,
//     configurable: true,
// })
// } else {
// this[key] = newInfo[key]
// }
//         }
//     })

// }

// person.updateInfo(newPerson);
// console.log(person)

// Create a new property called address on the person object with an initial value of an empty object. Make this property non-enumerable and non-configurable.

Object.defineProperty(person, "address", {
  value: {},
  writable: true,
  enumerable: false,
  configurable: false,
});

// console.log(person)

const product = {
  name: "Laptop",
  price: 1000,
  quantity: 5,
};
// Use property descriptors to make the price and quantity properties non-enumerable and non-writable.

Object.defineProperty(product, "price", {
  value: 1000,
  writable: false,
  enumerable: false,
  configurable: true,
});
Object.defineProperty(product, "quantity", {
  value: 5,
  writable: false,
  configurable: true,
  enumerable: false,
});

// Implement a function called getTotalPrice that takes the product object as an argument and returns the total price (calculated as price * quantity). Ensure that the function accesses the non-enumerable properties directly using the Object.getOwnPropertyDescriptor method.

function getTotalPrice(obj) {
  const price = Object.getOwnPropertyDescriptor(obj, "price");
  const quantity = Object.getOwnPropertyDescriptor(obj, "quantity");
  const result = price.value * quantity.value;
  return result;
}

// console.log(getTotalPrice(product))

// Implement a function called deleteNonConfigurable that takes an object and a property name as arguments. The function should delete the specified property from the object if it exists. If the property is non-configurable, throw an error with an appropriate message.

function deleteNonConfigurable(obj, prop) {
  if (obj.hasOwnProperty(prop)) {
    const nonconfig = Object.getOwnPropertyDescriptor(obj, prop);
    if (nonconfig.configurable !== true) {
      throw new Error("nok");
    } else {
      delete obj[prop];
    }
  } else {
    throw new Error("not exist");
  }
}
// Create an object called bankAccount with the following properties and values:

// Use a getter to define a property called formattedBalance, which returns the balance with a currency symbol (e.g., "$1000").
// Use a setter to define a property called balance, which updates the account balance and automatically updates the corresponding formattedBalance value.

const bankAccount = {
  _balance: 1000,

  get balance() {
    return this._balance;
  },
  set balance(newBalance) {
    this._balance = newBalance;
  },
  get formatted() {
    return `$${this.balance}`;
  },
};

// console.log(bankAccount.formatted);
// bankAccount.balance=20;
// console.log(bankAccount.formatted);

// Implement a method called transfer on the bankAccount object that takes two bankAccount objects and an amount as arguments. The method should transfer the specified amount from the current account to the target account. Ensure that the balance and formattedBalance properties of both accounts are updated correctly.

bankAccount.transfer = function (current, target, num) {
  current.balance = current.balance - num;
  target.balance = target.balance + num;
};
// const bankAccount2 ={
//   balance:0,
// }
// bankAccount.transfer(bankAccount, bankAccount2,100);
// console.log(bankAccount2);

// Implement a function called validateObject that takes an object and a validation schema as arguments. The schema should define the required properties, their types, and any additional validation rules. The function should return true if the object matches the schema, and false otherwise. You can choose any schema you want.

const personSchema = {
  firstName: "string",
  lastName: "string",
  age: "number",
  email: "string",
};

function validateObject(obj, schema) {
  Object.keys(obj).forEach((key) => {
    if (!obj.hasOwnProperty(key)) {
      return false;
    }
    const objt = typeof obj[key];
    const schemat = schema[key];
    if (objt !== schemat) {
      return false;
    }
  });
  return true;
}

// console.log(validateObject(person, personSchema)); //true

// Create a function called customFilterUnique that takes an array and a callback function as arguments. The customFilterUnique function should filter the array using the callback function to determine uniqueness. The resulting array should contain only unique elements based on the callback's logic.
// Use the customFilterUnique function to filter an array of objects based on a specific property and return only unique objects.

function customFilterUnique(arr, callback) {
  let uniqueArr = [];
  let count = {};

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

// console.log(customFilterUnique(arr11, (el) => el.id));

// Create a function called chunkArray that takes an array and a chunk size as arguments. The chunkArray function should divide the array into smaller arrays, each containing elements of the specified chunk size. The function should return an array of arrays.
// Optimize the chunkArray function to minimize memory usage while chunking the array.

function chunkArray(arr, chunk) {
  let resultArr = [];
  for (let i = 0; i < arr.length; i += chunk) {
    resultArr.push(arr.slice(i, chunk + i));
  }
  return resultArr;
}
// const arrayToChunk = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const chunkSize = 4;

// console.log(chunkArray(arrayToChunk, chunkSize));

// Create a function called customShuffle that takes an array as an argument and returns a new array with its elements randomly shuffled.
// Implement the customShuffle function using an efficient shuffling algorithm to achieve uniform randomness.

function customShuffle(arr) {
  let newArr = [...arr];
  for (let i = 0; i < arr.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

// Create a function called getArrayIntersection that takes two arrays as arguments and returns a new array containing the common elements between the two arrays.
// Create a function called getArrayUnion that takes two arrays as arguments and returns a new array containing all unique elements from both arrays, without any duplicates.

function getArrayIntersection(arr1, arr2) {
  let newArr = [];
  let result = [];
  arr1.forEach((e) => {
    if (!newArr.includes(e)) {
      newArr.push(e);
    }
  });
  newArr.forEach((e) => {
    if (arr2.includes(e)) {
      result.push(e);
    }
  });
  return result;
}

function getArrayUnion(arr1, arr2) {
  let newArr = [];
  arr1.forEach((e) => {
    if (!newArr.includes(e)) {
      newArr.push(e);
    }
  });
  arr2.forEach((e) => {
    if (!newArr.includes(e)) {
      newArr.push(e);
    }
  });
  return newArr;
}

let array1 = [1, 2, 3, 4, 5, 2, "a"];
let array2 = ["a", "b", "c", 2, "d", "c", 3];

// console.log(getArrayIntersection(array1, array2));
// console.log(getArrayUnion(array1, array2));

function give70by30(a, b) {
  let randomNumber = Math.random();
  if (randomNumber >= 0.7) {
    return a;
  } else {
    return b;
  }
}

// You are working on a localization library that uses tagged templates to handle multiple languages. Implement a function called `localize` that acts as a quasi-tagged template. The function should take a template string and an object containing language-specific translations. It should replace placeholders in the template string with the corresponding translations from the provided object.

const translations = {
  en: {
    greet: "Hello",
    intro: "Welcome to our website",
  },
  fr: {
    greet: "Bonjour",
    intro: "Bienvenue sur notre site web",
  },
};

function localize(strings, ...obj) {
  return function (language) {
    const translation = translations[language];
    return obj.map((key) => translation[key]).join("");
  };
}

// const language = "fr"; // Change to "en" for English
// const greeting = "greet";
// const introduction = "intro";

// const localizedGreeting = localize`123${greeting}4556`(language);

// console.log(localizedGreeting); // Expected: "Bonjour" (for language "fr")

// console.log(localize`123${introduction}`(language)); // Expected: "Bienvenue sur notre site web" (for language "fr")

// Create a function called highlightKeywords that acts as a tagged template. The function should take a template string and an array of keywords. It should highlight each occurrence of a keyword in the template by wrapping it in a <span> element with a specific CSS class. Use template literals and string manipulation to achieve this.

function highlightKeywords(template, arr) {
  let result = template;
  arr.forEach((key, index) => {
    const keyword = `<span>${key}</span>`;
    result = result.replace(`\${${index}}`, keyword);
  });
  return result;
}

const keywords = ["JavaScript", "template", "tagged"];
const template =
  "Learn ${0} tagged templates to create custom ${1} literals for ${2} manipulation.";

// console.log(highlightKeywords(template, keywords));

// Implement a multiline tagged template function called multiline that takes a template string and returns a string with line numbers added at the beginning of each line. The line numbers should start from 1 and increase for each line. Preserve the original indentation of each line.

function multiline(template) {
  let result = template[0].trim().split("\n");
  let final = result.map((line, index) => `${index + 1} ${line}`).join("\n");
  return final;
}

const code = multiline`
function add(a, b) {
return a + b;
}
`;
// console.log(code)

// Your task is to implement a debounce function that takes a function and a delay time as arguments. The goal of the debounce function is to ensure that the provided function is only executed after the user stops invoking it for the specified delay time.

// **Instructions**

// 1. Implement a function called `debounce` that takes two arguments:
// - `func`: The function to be debounced.
// - `delay`: The delay time (in milliseconds) before the function is executed.
// 1. The `debounce` function should return a new function that wraps the provided function.
// 2. When the new function is invoked, it should:
// - Clear any existing timeout.
// - Set a new timeout to execute the provided function after the specified delay time.
// 1. Test your `debounce` function by using it to debounce an input event listener. Ensure that the provided function is only called once after the user stops typing for the specified delay time.

function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Your task is to implement a throttle function that takes a function and a time interval as arguments. The throttle function should ensure that the provided function is executed at most once within the specified time interval.

// **Instructions**

// 1. Implement a function called `throttle` that takes two arguments:
// - `func`: The function to be throttled.
// - `interval`: The time interval (in milliseconds) within which the function can be executed.
// 1. The `throttle` function should return a new function that wraps the provided function.
// 2. When the new function is invoked, it should:
// - Check if the specified time interval has elapsed since the last execution of the provided function.
// - If the interval has not elapsed, ignore the invocation.
// - If the interval has elapsed, execute the provided function and update the last execution timestamp.
// 1. Test your `throttle` function by using it to throttle a scroll event listener. Ensure that the provided function is executed at most once within the specified time interval during rapid scrolling.

function throttle(func, interval) {
  let lastExecutionTime = 0;

  return function (...args) {
    let currentTime = Date.now();
    if (currentTime - lastExecutionTime >= interval) {
      func.apply(this, args);
      lastExecutionTime = currentTime;
    }
  };
}

// Your task is to implement a currying function that converts a given function into a curried version. Currying is a technique in which a function that takes multiple arguments is transformed into a sequence of functions, each taking a single argument.

// **Instructions**

// 1. Implement a function called `curry` that takes two arguments:
// - `func`: The function to be curried.
// - `arity`: The number of arguments the original function takes.
// 1. The `curry` function should return a new curried function.
// 2. The curried function should keep accepting arguments until it has received the specified number of arguments (`arity`). Once all arguments are received, the original function should be executed with the collected arguments.
// 3. If the curried function is invoked with fewer arguments than `arity`, it should return a new curried function that waits for the remaining arguments.

function curry(func, arity) {
  return function curried(...args) {
    if (args.length >= arity) {
      return func.apply(this, args);
    } else {
      return function (...newArgs) {
        return curried.apply(this, args.concat(newArgs));
      };
    }
  };
}

// Your task is to implement a function called promiseAll that mimics the behavior of Promise.all(). The function should accept an array of promises and return a single promise that resolves to an array of resolved values or rejects with the reason of the first rejected promise.
// Instructions
// Implement a function called promiseAll that takes an array of promises as an argument.
// The function should return a new promise that resolves when all promises in the input array have resolved, and rejects if any of the promises reject.
// If all promises resolve, the resolved value of the returned promise should be an array containing the resolved values of the input promises, in the same order.
// If any promise rejects, the returned promise should reject with the reason of the first rejected promise.

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    let counter = 0;
    let arrsum = [];

    promises.forEach((promise, index) =>
      promise
        .then((result) => {
          counter++;
          arrsum[index] = result;

          if (counter === promises.length) {
            resolve(arrsum);
          }
        })
        .catch(reject)
    );
  });
}
// Example
const promisesOK = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
// const promisesNOK = [Promise.resolve(1), Promise.resolve(2), Promise.reject(3)];

promiseAll(promisesOK)
  .then((results) => {
    console.log("All promises resolved:", results); // Expected: [1, 2, 3]
  })
  .catch((error) => {
    console.error("At least one promise rejected:", error);
  });

// promiseAll(promisesNOK)
//   .then((results) => {
//     console.log("All promises resolved:", results);
//   })
//   .catch((error) => {
//     console.error("At least one promise rejected:", error); // Expected: [3]
//   });