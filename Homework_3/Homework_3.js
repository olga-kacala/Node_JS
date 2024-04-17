// Homework 3
// Deadline: 22 April

// Task 1: Immutability and Pure Functions

// Implement a pure function called calculateDiscountedPrice that takes an array of products and a discount percentage as arguments. The function should return a new array of products with discounted prices based on the given percentage, without modifying the original products.


const calculateDiscountedPrice = (products, discount) => {
    return products.map((product) => {
        const discountedPrice = product.price*(1-discount*0.01)
    return {...product, price: discountedPrice}
    })
 
};

module.exports = calculateDiscountedPrice;
// Create a pure function called calculateTotalPrice that takes an array of products as an argument. The function should return the total price of all products, without modifying the original array or its items.

// Task 2: Function Composition and Point-Free Style
// Implement a function called getFullName that takes a person object with firstName and lastName properties. The function should return the person's full name in the format "FirstName LastName".
// Create a function called filterUniqueWords that takes a string of text and returns an array of unique words, sorted in alphabetical order, without using explicit loops. Use function composition and point-free style.
// Implement a function called getAverageGrade that takes an array of student objects, each containing a name and grades property. The function should return the average grade of all students, without modifying the original array or its items. Use function composition and point-free style.

// Task 3: Closures and Higher-Order Functions
// Create a function called createCounter that returns a closure. The closure should be a counter function that increments the count on each call and returns the updated count. Each closure should have its own independent count.
// Implement a higher-order function called repeatFunction that takes a function and a number as arguments. The function should return a new function that invokes the original function multiple times based on the provided number. If the number is negative, the new function should invoke the original function indefinitely until stopped.

// Task 4: Recursion and Tail Call Optimization
// Implement a recursive function called calculateFactorial that calculates the factorial of a given number. Optimize the function to use tail call optimization to avoid stack overflow for large input numbers.
// Create a recursive function called power that takes a base and an exponent as arguments. The function should calculate the power of the base to the exponent using recursion.

// Task 5: Lazy Evaluation and Generators (*do not use yield)
// Implement a lazy evaluation function called lazyMap that takes an array and a mapping function. The function should return a lazy generator that applies the mapping function to each element of the array one at a time.
// Create a lazy generator function called fibonacciGenerator that generates Fibonacci numbers one at a time using lazy evaluation.