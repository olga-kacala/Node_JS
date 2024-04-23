// Homework 4
// Deadline: 26 April

// Task 1: Object Property Manipulation
// Create an object called person with the following properties and values:
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
    configurable: false,
  });
});

// Implement a method called updateInfo on the person object that takes a new info object as an argument. The info object should contain updated values for any of the properties (e.g., { firstName: "Jane", age: 32 }). Ensure that this method adheres to the read-only property descriptor set earlier.

const newInfo = {
  firstName: "Alice",
  lastName: "Bow",
  age: 55,
  email: "alice.bow@example.com",
};

const updateInfo = (newInfo) => {
  Object.keys(newInfo).forEach((key) => {
    if (Object.getOwnPropertyDescriptor(person, key).writable) {
      person[key] = newInfo[key];
    }
  });
  return person;
};

// Create a new property called address on the person object with an initial value of an empty object. Make this property non-enumerable and non-configurable.

Object.defineProperty(person, "address", {
  value: {},
  writable: true,
  configurable: false,
  enumerable: false,
});

// Task 2: Object Property Enumeration and Deletion
// Create a new object called product with the following properties and values:

const product = {
  name: "Laptop",
  price: 1000,
  quantity: 5,
};

// Use property descriptors to make the price and quantity properties non-enumerable and non-writable.

Object.defineProperty(product, "price", {
  value: 1000,
  writable: false,
  configurable: true,
  enumerable: false,
});
Object.defineProperty(product, "quantity", {
  value: 5,
  writable: false,
  configurable: true,
  enumerable: false,
});

// Implement a function called getTotalPrice that takes the product object as an argument and returns the total price (calculated as price * quantity). Ensure that the function accesses the non-enumerable properties directly using the Object.getOwnPropertyDescriptor method.

const getTotalPrice = (product) => {
  const price = Object.getOwnPropertyDescriptor(product, "price");
  const quantity = Object.getOwnPropertyDescriptor(product, "quantity");
  const totalPrice = price.value * quantity.value;
  return totalPrice;
};

// Implement a function called deleteNonConfigurable that takes an object and a property name as arguments. The function should delete the specified property from the object if it exists. If the property is non-configurable, throw an error with an appropriate message.

const deleteNonConfigurable = (object, property) => {
  if (object.hasOwnProperty(property)) {
    const nonconf = Object.getOwnPropertyDescriptor(object, property);
    if (nonconf.configurable === true) {
      delete object[property];
    } else {
      throw new Error("Property is non-configurable");
    }
  } else {
    throw new Error("Property not existing");
  }
};

// Task 3: Object Property Getters and Setters
// Create an object called bankAccount with the following properties and values:

// Use a getter to define a property called formattedBalance, which returns the balance with a currency symbol (e.g., "$1000").
// Use a setter to define a property called balance, which updates the account balance and automatically updates the corresponding formattedBalance value.

const bankAccount = {
  _balance: 1000, // default value

  get balance() {
    return this._balance;
  },

  set balance(newBalance) {
    this._balance = newBalance;
  },

  get formattedBalance() {
    return `$${this.balance}`;
  },
};

// Implement a method called transfer on the bankAccount object that takes two bankAccount objects and an amount as arguments. The method should transfer the specified amount from the current account to the target account. Ensure that the balance and formattedBalance properties of both accounts are updated correctly.

// Task 4: Advanced Property Descriptors
// Implement a function called createImmutableObject that takes an object as an argument and returns a new object with all its properties made read-only and non-writable using property descriptors. The function should handle nested objects and arrays recursively.
// Use the createImmutableObject function to create an immutable version of the person object from Task 1.

// Task 5: Object Observation
// Implement a function called observeObject that takes an object and a callback function as arguments. The function should return a proxy object that wraps the original object and invokes the callback function whenever any property of the object is accessed or modified.
// Use the observeObject function to create a proxy for the person object from Task 1. The callback function should log the property name and the action (get or set) performed on the object.

// Task 6: Object Deep Cloning
// Implement a function called deepCloneObject that takes an object as an argument and returns a deep copy of the object. The function should handle circular references and complex nested structures. Do not use JSON methods.

// Task 7: Object Property Validation
// Implement a function called validateObject that takes an object and a validation schema as arguments. The schema should define the required properties, their types, and any additional validation rules. The function should return true if the object matches the schema, and false otherwise. You can choose any schema you want.

module.exports = {
  updateInfo,
  person,
  newInfo,
  product,
  getTotalPrice,
  deleteNonConfigurable,
  bankAccount,
};
