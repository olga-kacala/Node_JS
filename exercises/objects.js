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

bankAccount.transfer = function (current, target, num){
current.balance = current.balance - num;
target.balance = target.balance + num;

}
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

function validateObject (obj, schema) {
  Object.keys(obj).forEach((key)=>{
  if(!obj.hasOwnProperty(key)){return false}
  const objt = typeof obj[key];
  const schemat = schema[key];
  if(objt !== schemat){return false}
  })
  return true
}

// console.log(validateObject(person, personSchema)); //true

// Create a function called customFilterUnique that takes an array and a callback function as arguments. The customFilterUnique function should filter the array using the callback function to determine uniqueness. The resulting array should contain only unique elements based on the callback's logic.
// Use the customFilterUnique function to filter an array of objects based on a specific property and return only unique objects.

function customFilterUnique (arr,callback){
  let uniqueArr = [];
  let count = {};
  
arr.forEach((item)=> {
  const callbackKey = callback(item);
if(count[callbackKey] === undefined){
  count[callbackKey]=1;
} else { count[callbackKey]++}
})
  arr.forEach((item)=> {
    const callbackKey = callback(item);
  if(count[callbackKey] ===1){
    uniqueArr.push(item);}
  }
  
  );
  
  return uniqueArr
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

function chunkArray (arr, chunk){
  let resultArr = [];
  for (let i =0; i< arr.length; i+= chunk){
    resultArr.push(arr.slice(i, chunk+i))
  }
  return resultArr
}
// const arrayToChunk = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const chunkSize = 4;

// console.log(chunkArray(arrayToChunk, chunkSize));

// Create a function called customShuffle that takes an array as an argument and returns a new array with its elements randomly shuffled.
// Implement the customShuffle function using an efficient shuffling algorithm to achieve uniform randomness.

function customShuffle (arr){
  let newArr = [...arr];
  for(let i = 0; i<arr.length; i++){
    const j = Math.floor(Math.random()*(i+1));
[newArr[i] , newArr[j]]= [newArr[j] , newArr[i]];

  }
  return newArr
}

// Create a function called getArrayIntersection that takes two arrays as arguments and returns a new array containing the common elements between the two arrays.
// Create a function called getArrayUnion that takes two arrays as arguments and returns a new array containing all unique elements from both arrays, without any duplicates.

function getArrayIntersection (arr1, arr2){
  let newArr = [];
  let result = [];
  arr1.forEach(e => {
    if(!newArr.includes(e)){
      newArr.push(e)
    }
  })
  newArr.forEach(e=>{
    if(arr2.includes(e)){
      result.push(e)
    }
  })
  return result
}

function getArrayUnion (arr1, arr2){
  let newArr = [];
  arr1.forEach(e => {
    if(!newArr.includes(e)){
      newArr.push(e)
    }
  })
  arr2.forEach(e=>{
    if(!newArr.includes(e)){
      newArr.push(e)
    }
  })
  return newArr
}


let array1 = [1, 2, 3, 4, 5, 2, "a"];
let array2 = ["a", "b", "c", 2, "d", "c", 3];

// console.log(getArrayIntersection(array1, array2));
// console.log(getArrayUnion(array1, array2));

function give70by30 (a,b) {
  let randomNumber = Math.random();
  if(randomNumber>=0.7){
    return a
  } else {return b}
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

function localize (template, ...obj){
return function (language){
  const translation = translations[language];
  return obj.map((key)=>translation[key]).join("");
}

}

const language = "fr"; // Change to "en" for English
const greeting = "greet";
const introduction = "intro";

const localizedGreeting = localize`123${greeting}4556`(language);


console.log(localizedGreeting); // Expected: "Bonjour" (for language "fr")

console.log(localize`123${introduction}`(language)); // Expected: "Bienvenue sur notre site web" (for language "fr")
