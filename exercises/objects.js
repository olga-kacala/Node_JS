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

function getTotalPrice (obj){
    const price = Object.getOwnPropertyDescriptor(obj, "price");
    const quantity = Object.getOwnPropertyDescriptor(obj, "quantity");
    const result = price.value*quantity.value
    return result
}

// console.log(getTotalPrice(product))

// Implement a function called deleteNonConfigurable that takes an object and a property name as arguments. The function should delete the specified property from the object if it exists. If the property is non-configurable, throw an error with an appropriate message.

