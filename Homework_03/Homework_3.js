// Homework 3
// Deadline: 22 April

// Task 1: Immutability and Pure Functions

// Implement a pure function called calculateDiscountedPrice that takes an array of products and a discount percentage as arguments. The function should return a new array of products with discounted prices based on the given percentage, without modifying the original products.
const HW3 = {
  calculateDiscountedPrice: function (products, discount) {
    return products.map((product) => {
      const discountedPrice = product.price * (1 - discount * 0.01);
      return { ...product, price: discountedPrice };
    });
  },

  // Create a pure function called calculateTotalPrice that takes an array of products as an argument. The function should return the total price of all products, without modifying the original array or its items.

  calculateTotalPrice: function (products) {
    return products.reduce(
      (totalPrice, product) => totalPrice + product.price,
      0
    );
  },

  // Task 2: Function Composition and Point-Free Style

  // Implement a function called getFullName that takes a person object with firstName and lastName properties. The function should return the person's full name in the format "FirstName LastName".

  getFullName: function ({ firstName, lastName }) {
    return `${firstName} ${lastName}`;
  },

  // Create a function called filterUniqueWords that takes a string of text and returns an array of unique words, sorted in alphabetical order, without using explicit loops. Use function composition and point-free style.

  // filterUniqueWords: function (text) {
  //   return [...new Set(text.split(" ").sort())];
  // },

  getWordsOfText: function (text) {
    return text.replace(/[^\w\s]/g, "").toLowerCase().split(" ");
  },

  filterUniqueValues: function (values) {
    return [...new Set(values)];
  },

  sortAlphabetically(values) {
    return values.sort();
  },

  filterUniqueWords: function (text) {
    return this.sortAlphabetically(
      this.filterUniqueValues(this.getWordsOfText(text))
    );
  },

  // Implement a function called getAverageGrade that takes an array of student objects, each containing a name and grades property. The function should return the average grade of all students, without modifying the original array or its items. Use function composition and point-free style.

  getAverageGrade: function (arr) {
    return (
      arr
        .map((student) => student.grades)
        .flat()
        .reduce((total, grade) => total + grade, 0) /
      arr.map((student) => student.grades).flat().length
    );
  },

  // Task 3: Closures and Higher-Order Functions

  // Create a function called createCounter that returns a closure. The closure should be a counter function that increments the count on each call and returns the updated count. Each closure should have its own independent count.

  createCounter: function () {
    let count = 1;
    const counter = () => {
      return count++;
    };
    return counter;
  },

  // Implement a higher-order function called repeatFunction that takes a function and a number as arguments. The function should return a new function that invokes the original function multiple times based on the provided number. If the number is negative, the new function should invoke the original function indefinitely until stopped.

  repeatFunction: function (fun, num) {
    if (num >= 0) {
      for (let i = 0; i < num; i++) {
        fun();
      }
    } else {
      while (true) {
        fun();
      }
    }
  },

  // Task 4: Recursion and Tail Call Optimization

  // Implement a recursive function called calculateFactorial that calculates the factorial of a given number. Optimize the function to use tail call optimization to avoid stack overflow for large input numbers.

  calculateFactorial: function (num, accumulator = 1) {
    if (num === 0) {
      return accumulator;
    } else {
      return this.calculateFactorial(num - 1, num * accumulator);
    }
  },

  // Create a recursive function called power that takes a base and an exponent as arguments. The function should calculate the power of the base to the exponent using recursion.

  power: function (base, exp) {
    if (exp === 0) {
      return 1;
    } else if (exp > 0) {
      return base * this.power(base, exp - 1);
    } else {
      return 1 / this.power(base, -exp);
    }
  },

  // Task 5: Lazy Evaluation and Generators (*do not use yield)

  // Implement a lazy evaluation function called lazyMap that takes an array and a mapping function. The function should return a lazy generator that applies the mapping function to each element of the array one at a time.

  lazyMap: function (array, mappingFunction) {
    let index = 0;

    return {
      next: function () {
        if (index < array.length) {
          return { value: mappingFunction(array[index++]), done: false };
        } else {
          return { done: true };
        }
      },
    };
  },

  // Create a lazy generator function called fibonacciGenerator that generates Fibonacci numbers one at a time using lazy evaluation.

  fibonacciGenerator: function () {
    let prev = 0;
    let current = 1;

    return {
      next: function () {
        const value = current;
        current += prev;
        prev = value;
        return { value, done: false };
      },
    };
  },
};

module.exports = HW3;
