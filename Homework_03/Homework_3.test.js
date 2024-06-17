const HW3 = require("./Homework_3");

const products = [
  { name: "Product 1", price: 100 },
  { name: "Product 2", price: 50 },
  { name: "Product 3", price: 200 },
];

describe("Task 1: Immutability and Pure Functions", () => {
  test("discount 20%", () => {
    expect(HW3.calculateDiscountedPrice(products, 20)).toEqual([
      { name: "Product 1", price: 80 },
      { name: "Product 2", price: 40 },
      { name: "Product 3", price: 160 },
    ]);
  });

  test("discount 2.35%", () => {
    expect(HW3.calculateDiscountedPrice(products, 2.35)).toEqual([
      { name: "Product 1", price: 97.65 },
      { name: "Product 2", price: 48.825 },
      { name: "Product 3", price: 195.3 },
    ]);
  });

  test("discount 0%", () => {
    expect(HW3.calculateDiscountedPrice(products, 0)).toEqual([
      { name: "Product 1", price: 100 },
      { name: "Product 2", price: 50 },
      { name: "Product 3", price: 200 },
    ]);
  });

  test("discount 100%", () => {
    expect(HW3.calculateDiscountedPrice(products, 100)).toEqual([
      { name: "Product 1", price: 0 },
      { name: "Product 2", price: 0 },
      { name: "Product 3", price: 0 },
    ]);
  });

  test("50% discount & original diff ", () => {
    const originalProducts = [
      { name: "Product 1", price: 100 },
      { name: "Product 2", price: 50 },
      { name: "Product 3", price: 200 },
    ];

    const originalProductsCopy = [...originalProducts];
    expect(originalProducts).toEqual(originalProductsCopy);

    expect(HW3.calculateDiscountedPrice(products, 50)).toEqual([
      { name: "Product 1", price: 50 },
      { name: "Product 2", price: 25 },
      { name: "Product 3", price: 100 },
    ]);
  });
  test("total price & original checkup", () => {
    const originalProducts = [
      { name: "Product 1", price: 100 },
      { name: "Product 2", price: 50 },
      { name: "Product 3", price: 200 },
    ];

    const originalProductsCopy = [...originalProducts];

    const totalPrice = HW3.calculateTotalPrice(originalProducts);

    expect(originalProducts).toEqual(originalProductsCopy);

    expect(totalPrice).toEqual(350);
  });
});

describe("Task 2: Function Composition and Point-Free Style", () => {
  test("getFullName", () => {
    const person = {
      firstName: "Julia",
      lastName: "Newman",
    };

    expect(HW3.getFullName(person)).toEqual("Julia Newman");
  });
  test("filterUniqueWords", () => {
    const text = "Create a function called a filterUniqueWords";

    expect(HW3.filterUniqueWords(text)).toEqual([
      "a",
      "called",
      "create",
      "filteruniquewords",
      "function",
    ]);
  });
  test("getAverageGrade", () => {
    const students = [
      { name: "Alice", grades: [5, 4, 5] },
      { name: "Bob", grades: [2, 2, 3] },
      { name: "Charlie", grades: [5, 5, 5] },
    ];

    expect(HW3.getAverageGrade(students)).toBe(4);
  });
});

describe("Task 3: Closures and Higher-Order Functions", () => {
  it("createCounter x3", () => {
    const counter = HW3.createCounter();

    expect(counter()).toBe(1);
    expect(counter()).toBe(2);
    expect(counter()).toBe(3);
  });
  it("call function x2", () => {
    const fun = jest.fn(); // Mocking the function
    HW3.repeatFunction(fun, 2);
    expect(fun).toHaveBeenCalledTimes(2);
  });
});

describe("Task 4: Recursion and Tail Call Optimization", () => {
  it("should calculate the factorial of a given number", () => {
    expect(HW3.calculateFactorial(5)).toBe(120);
  });

  test("calculate the power of the base to the exponent", () => {
    expect(HW3.power(2, 3)).toBe(8);
  });
  test("calculate the power of the base to the exponent with 0", () => {
    expect(HW3.power(2, 0)).toBe(1);
  });
});

describe("Task 5: Lazy Evaluation and Generators", () => {
    test("lazily map values in an array", () => {
      const array = [1, 2, 3, 4, 5];
      const mapper = HW3.lazyMap(array, (x) => x * 2);
      expect(mapper.next().value).toBe(2);
      expect(mapper.next().value).toBe(4);
      expect(mapper.next().value).toBe(6);
      expect(mapper.next().value).toBe(8);
      expect(mapper.next().value).toBe(10);
      expect(mapper.next().done).toBe(true);
    });
  
  test("lazily generate Fibonacci numbers", () => {
    const fibonacci = HW3.fibonacciGenerator();
    expect(fibonacci.next().value).toBe(1);
    expect(fibonacci.next().value).toBe(1);
    expect(fibonacci.next().value).toBe(2);
    expect(fibonacci.next().value).toBe(3);
    expect(fibonacci.next().value).toBe(5);
    expect(fibonacci.next().value).toBe(8);
  });
});
