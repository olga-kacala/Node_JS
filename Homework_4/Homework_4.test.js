const {
  updateInfo,
  person,
  newInfo,
  product,
  getTotalPrice,
  deleteNonConfigurable,
} = require("./Homework_4");

describe("Task 1: Object Property Manipulation", () => {
  test("original person object", () => {
    expect(person).toEqual({
      firstName: "John",
      lastName: "Doe",
      age: 30,
      email: "john.doe@example.com",
    });
  });
  test("person object unchanged by newInfo", () => {
    const updatedPerson = updateInfo(newInfo);
    expect(updatedPerson).toEqual({
      firstName: "John",
      lastName: "Doe",
      age: 30,
      email: "john.doe@example.com",
    });
  });
});

describe("Task 2: Object Property Enumeration and Deletion", () => {
  test("product properties non-enumerable and non-writable", () => {
    const priceDescriptor = Object.getOwnPropertyDescriptor(product, "price");
    const quantityDescriptor = Object.getOwnPropertyDescriptor(
      product,
      "quantity"
    );

    expect(priceDescriptor.enumerable).toBe(false);
    expect(priceDescriptor.writable).toBe(false);

    expect(quantityDescriptor.enumerable).toBe(false);
    expect(quantityDescriptor.writable).toBe(false);
  });

  test("getTotalPrice function returns correct total price", () => {
    const totalPrice = getTotalPrice(product);
    expect(totalPrice).toEqual(5000);
  });

  test("Should delete a configurable property", () => {
    const obj = {
      name: "OK",
      age: 22,
    };
    deleteNonConfigurable(obj, "name");
    expect(obj).toEqual({
      age: 22,
    });
  });

  test("Should throw an error when trying to delete a non-configurable property", () => {
    const obj = {
      name: "OK",
      age: 22,
    };
    Object.defineProperty(obj, "age", {
      configurable: false,
    });
    expect(() => {
      deleteNonConfigurable(obj, "age");
    }).toThrow("Property is non-configurable");
  });

  test("Should throw an error when trying to delete a property that does not exist", () => {
    const obj = {
      name: "OK",
      age: 22,
    };
    expect(() => {
      deleteNonConfigurable(obj, "city");
    }).toThrow("Property not existing");
  });
});
