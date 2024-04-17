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
    const text = "create a function called a filterUniqueWords";

    expect(HW3.filterUniqueWords(text)).toEqual([
      "a",
      "called",
      "create",
      "filterUniqueWords",
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
  it("should return a counter function that increments count on each call", () => {
    const counter = HW3.createCounter();

    // Test the counter function with multiple calls
    expect(counter()).toBe(1);
    expect(counter()).toBe(2);
    expect(counter()).toBe(3);
  });

  it("should return independent counters with separate counts", () => {
    const counter1 = HW3.createCounter();
    const counter2 = HW3.createCounter();

    // Test the first counter
    expect(counter1()).toBe(1);
    expect(counter1()).toBe(2);

    // Test the second counter
    expect(counter2()).toBe(1);
    expect(counter2()).toBe(2);
  });
});
