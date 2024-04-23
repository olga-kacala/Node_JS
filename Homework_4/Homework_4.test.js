const { updateInfo } = require("./Homework_4");

const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  email: "john.doe@example.com",
};

const newInfo = {
  firstName: "Alice",
  lastName: "Bow",
  age: 55,
  email: "alice.bow@example.com",
};

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
