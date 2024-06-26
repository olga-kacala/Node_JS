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
    configurable: true,
  });
});

// Implement a method called updateInfo on the person object that takes a new info object as an argument. The info object should contain updated values for any of the properties (e.g., { firstName: "Jane", age: 32 }). Ensure that this method adheres to the read-only property descriptor set earlier.
const newPerson = { firstName: "Jane", age: 55 };

person.updateInfo = function (newInfo) {
  Object.keys(newInfo).forEach((key) => {
    if (this.hasOwnProperty(key)) {
      if (!Object.getOwnPropertyDescriptor(this, key).writable) {
        Object.defineProperty(this, key, {
          value: this[key],
          writable: true,
          enumerable: true,
          configurable: true,
        });
        this[key] = newInfo[key];
        Object.defineProperty(this, key, {
          value: this[key],
          writable: false,
          enumerable: true,
          configurable: true,
        });
      } else {
        this[key] = newInfo[key];
      }
    } else {
      console.log(`Property '${key}' does not exist in the object.`);
    }
  });
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
  _balance: 1000,

  get balance() {
    return this._balance;
  },

  set balance(newBalance) {
    if (typeof newBalance === "number" && !isNaN(newBalance)) {
      this._balance = newBalance;
    } else {
      console.error("Invalid balance. Balance must be a valid number.");
    }
  },

  get formattedBalance() {
    return `$${this.balance}`;
  },
};

// Implement a method called transfer on the bankAccount object that takes two bankAccount objects and an amount as arguments. The method should transfer the specified amount from the current account to the target account. Ensure that the balance and formattedBalance properties of both accounts are updated correctly.

bankAccount.transfer = function (account1, account2, amount) {
  if (typeof amount !== "number" || isNaN(amount)) {
    console.error("Invalid amount. Amount must be a valid number.");
    return;
  }

  if (account1.balance < amount) {
    console.error("Insufficient balance in the source account.");
    return;
  }

  account1.balance -= amount;
  account2.balance += amount;

  console.log(
    `Transfer of $${amount} from ${account1.formattedBalance} to ${account2.formattedBalance} was successful.`
  );
};

// Testing the transfer method
const targetAccount = {
  _balance: 500,
  get balance() {
    return this._balance;
  },
  set balance(newBalance) {
    if (typeof newBalance === "number" && !isNaN(newBalance)) {
      this._balance = newBalance;
    } else {
      console.error("Invalid balance. Balance must be a valid number.");
    }
  },
  get formattedBalance() {
    return `$${this.balance}`;
  },
};

// Task 4: Advanced Property Descriptors
// Implement a function called createImmutableObject that takes an object as an argument and returns a new object with all its properties made read-only and non-writable using property descriptors. The function should handle nested objects and arrays recursively.
// Use the createImmutableObject function to create an immutable version of the person object from Task 1.

function createImmutableObject(obj) {
  const immutableObj = {};

  Object.keys(obj).forEach((key) => {
    const propertyDescriptor = Object.getOwnPropertyDescriptor(obj, key);
    if (
      propertyDescriptor.value !== null &&
      typeof propertyDescriptor.value === "object"
    ) {
      immutableObj[key] = createImmutableObject(obj[key]);
    } else {
      Object.defineProperty(immutableObj, key, {
        value: obj[key],
        writable: false,
        enumerable: true,
        configurable: false,
      });
    }
  });
  return immutableObj;
}

// const immutablePerson = createImmutableObject(person);
// console.log(immutablePerson);
// console.log(Object.getOwnPropertyDescriptor(immutablePerson, 'firstName').configurable);

// Task 5: Object Observation
// Implement a function called observeObject that takes an object and a callback function as arguments. The function should return a proxy object that wraps the original object and invokes the callback function whenever any property of the object is accessed or modified.
// Use the observeObject function to create a proxy for the person object from Task 1. The callback function should log the property name and the action (get or set) performed on the object.

function observeObject(obj, callback) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      callback(property, "get");
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      callback(property, "set");
      return Reflect.set(target, property, value, receiver);
    },
  });
}

const observedPerson = observeObject(person, (property, action) => {
  console.log(`Property '${property}' was ${action} on the object.`);
});

// console.log(observedPerson.firstName)
// observedPerson.age = 100;

// Task 6: Object Deep Cloning
// Implement a function called deepCloneObject that takes an object as an argument and returns a deep copy of the object. The function should handle circular references and complex nested structures. Do not use JSON methods.

function deepCloneObject(obj, clonedObjects = new WeakMap()) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  if (clonedObjects.has(obj)) {
    return clonedObjects.get(obj);
  }
  let clone;
  if (Array.isArray(obj)) {
    clone = [];
  } else {
    clone = Object.create(Object.getPrototypeOf(obj));
  }
  clonedObjects.set(obj, clone);
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepCloneObject(obj[key], clonedObjects);
    }
  }
  return clone;
}

const originalObject = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    country: "USA",
  },
};

// originalObject.self = originalObject; // Circular reference

// const clonedObject = deepCloneObject(originalObject);

// clonedObject.name = "Jane";
// clonedObject.address.city = "Los Angeles";

// console.log("Original Object:", originalObject);
// console.log("Cloned Object:", clonedObject);

// Task 7: Object Property Validation
// Implement a function called validateObject that takes an object and a validation schema as arguments. The schema should define the required properties, their types, and any additional validation rules. The function should return true if the object matches the schema, and false otherwise. You can choose any schema you want.

function validateObject(obj, schema) {
  for (const key in schema) {
    if (!obj.hasOwnProperty(key)) {
      return false;
    }
    const expectedType = schema[key];
    const actualType = typeof obj[key];
    if (actualType !== expectedType) {
      return false;
    }
  }

  return true;
}

// Example schema
const personSchema = {
  firstName: "string",
  lastName: "string",
  age: "number",
  email: "string",
};

// console.log(validateObject(person, personSchema)); //true

module.exports = {
  person,
  newPerson,
  updateInfo: person.updateInfo,
  product,
  getTotalPrice,
  deleteNonConfigurable,
  bankAccount,
  targetAccount,
  createImmutableObject,
  deepCloneObject,
  originalObject,
  validateObject,
  personSchema,
};
