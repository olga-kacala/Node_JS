const {
  person,
  newPerson,
  product,
  getTotalPrice,
  deleteNonConfigurable,
  bankAccount,
  targetAccount,
} = require("./Homework_4");

describe("Task 1: Object Property Manipulation", () => {
  test("Properties of person object should be read-only and non-writable", () => {
    person.firstName = "Jane"; // Attempt to change the value
    expect(person.firstName).toBe("John");

    person.age = 140; // Attempt to change the value
    expect(person.age).toBe(30);
  });

  test("updateInfo method should update properties", () => {
    person.updateInfo(newPerson);
    expect(person.firstName).toBe("Jane");
    expect(person.age).toBe(55);
  });

  test("New property address should be non-enumerable & non-configurable", () => {
    const addressDescriptor = Object.getOwnPropertyDescriptor(
      person,
      "address"
    );

    expect(addressDescriptor.enumerable).toBe(false);
    expect(addressDescriptor.configurable).toBe(false);
    expect(addressDescriptor.writable).toBe(true);
    expect(addressDescriptor.value).toEqual({});
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

describe("Task 3: Object Property Getters and Setters", () => {
  test("Transfer $200 from bankAccount to targetAccount", () => {
    bankAccount.transfer(bankAccount, targetAccount, 200);

    expect(bankAccount.balance).toBe(800);
    expect(targetAccount.balance).toBe(700);
  });

  test("Attempt transfer with insufficient balance", () => {
    bankAccount.balance = 100;

    const errorMock = jest.spyOn(console, "error");
    errorMock.mockImplementation(() => {});

    bankAccount.transfer(bankAccount, targetAccount, 200);

    expect(console.error).toHaveBeenCalledWith(
      "Insufficient balance in the source account."
    );
    errorMock.mockRestore();
  });
});
