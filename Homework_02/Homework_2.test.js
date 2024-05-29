const AdvancedDataTransformation = require("./Homework_2");
describe("Adding values", () => {
  test("Add 5 and 10", () => {
    expect(AdvancedDataTransformation.addValues(5, 10)).toBe(15);
  });
  test("Add 5n and 10n", () => {
    expect(AdvancedDataTransformation.addValues(BigInt(5), BigInt(10))).toBe(
      15n
    );
  });
  test("Add strings", () => {
    expect(AdvancedDataTransformation.addValues("Homework 2", " is fun")).toBe(
      "Homework 2 is fun"
    );
  });
  test("Add arrays", () => {
    expect(AdvancedDataTransformation.addValues([1, 2], [3, 4])).toStrictEqual([
      4, 6,
    ]);
  });
  test("Add arrays error", () => {
    expect(() => {
      AdvancedDataTransformation.addValues([1, 2], [3, 4, 5]);
    }).toThrow("Arrays must have the same length");
  });
  test("Add Bool and number", () => {
    expect(() => {
      AdvancedDataTransformation.addValues(true, 1);
    }).toThrow("Addition not possible for the given types: boolean & number");
  });
  test("Add Booleans", () => {
    expect(AdvancedDataTransformation.addValues(true, false)).toBe(1);
  });
  test("Add Symbols", () => {
    expect(() =>
      AdvancedDataTransformation.addValues(
        Symbol("foo"),
        Symbol("bar")
      ).toThrow("Addition not possible for the given types: symbol & symbol")
    );
  });
  test("Add NaNs", () => {
    expect(() => AdvancedDataTransformation.addValues(NaN, NaN)).toThrow(
      "Cannot add NaN values"
    );
  });
});

describe("String convertion:", () => {
  test("from string", () => {
    expect(AdvancedDataTransformation.stringifyValue("word")).toBe("word");
  });
  test("type of string", () => {
    expect(typeof AdvancedDataTransformation.stringifyValue("word")).toBe(
      "string"
    );
  });
  test("from number", () => {
    expect(AdvancedDataTransformation.stringifyValue(11)).toBe("11");
  });
  test("type of string", () => {
    expect(typeof AdvancedDataTransformation.stringifyValue(11)).toBe("string");
  });
  test("from BigINt", () => {
    expect(AdvancedDataTransformation.stringifyValue(BigInt(5))).toBe("5");
  });
  test("type of string", () => {
    expect(typeof AdvancedDataTransformation.stringifyValue(BigInt(5))).toBe(
      "string"
    );
  });
  test("from array", () => {
    expect(AdvancedDataTransformation.stringifyValue([1, 2])).toBe("[1,2]");
  });
  test("type of string", () => {
    expect(typeof AdvancedDataTransformation.stringifyValue([1, 2])).toBe(
      "string"
    );
  });

  test("from object", () => {
    const expected = JSON.stringify({ a: 1, b: 2 });
    expect(AdvancedDataTransformation.stringifyValue({ a: 1, b: 2 })).toBe(
      expected
    );
  });

  test("type of string", () => {
    expect(
      typeof AdvancedDataTransformation.stringifyValue({ a: 1, b: 2 })
    ).toBe("string");
  });
  test("from boolean", () => {
    expect(AdvancedDataTransformation.stringifyValue(true)).toBe("true");
  });
  test("type of string", () => {
    expect(typeof AdvancedDataTransformation.stringifyValue(true)).toBe(
      "string"
    );
  });
  test("from boolean", () => {
    expect(AdvancedDataTransformation.stringifyValue(false)).toBe("false");
  });
  test("type of string", () => {
    expect(typeof AdvancedDataTransformation.stringifyValue(false)).toBe(
      "string"
    );
  });
  function functionExample() {
    return "Suprise! I am a function";
  }

  test("from function", () => {
    expect(
      typeof AdvancedDataTransformation.stringifyValue(functionExample)
    ).toBe("string");
  });
  test("from symbol", () => {
    expect(
      typeof AdvancedDataTransformation.stringifyValue(Symbol("foo"))
    ).toBe("string");
  });
  test("from undefined", () => {
    expect(() => {
      AdvancedDataTransformation.stringifyValue(undefined);
    }).toThrow("Unable convert undefined value to string");
  });
  test("from null", () => {
    expect(AdvancedDataTransformation.stringifyValue(null)).toBe("null");
  });
});
describe("Invert to boolean", () => {
  test("Invert true", () => {
    expect(AdvancedDataTransformation.invertBoolean(true)).toBe(false);
  });
});

describe("Convert to number:", () => {
  test("3,14", () => {
    expect(AdvancedDataTransformation.convertToNumber("3,14")).toBe(3.14);
  });
  test("3.14", () => {
    expect(AdvancedDataTransformation.convertToNumber("3.14")).toBe(3.14);
  });
  test("true", () => {
    expect(AdvancedDataTransformation.convertToNumber(true)).toBe(1);
  });
  test("false", () => {
    expect(AdvancedDataTransformation.convertToNumber(false)).toBe(0);
  });
});

describe("Coerce to type", () => {
  test("Coerce number to string", () => {
    expect(AdvancedDataTransformation.coerceToType(10.9, "string")).toBe(
      "10.9"
    );
  });
  test("Coerce number to null", () => {
    expect(AdvancedDataTransformation.coerceToType(11, "null")).toBe(null);
  });
  test("Coerce number to undefined", () => {
    expect(AdvancedDataTransformation.coerceToType(11, "undefined")).toBe(
      undefined
    );
  });
  test("Coerce 0 to boolean", () => {
    expect(AdvancedDataTransformation.coerceToType(0, "boolean")).toBe(false);
  });
  test("Coerce 1 to boolean", () => {
    expect(AdvancedDataTransformation.coerceToType(1, "boolean")).toBe(true);
  });
  test("Coerce null to boolean", () => {
    expect(AdvancedDataTransformation.coerceToType(null, "boolean")).toBe(
      false
    );
  });
  test("Coerce number to boolean", () => {
    expect(AdvancedDataTransformation.coerceToType(20, "boolean")).toBe(true);
  });
  test("Coerce number to object", () => {
    expect(AdvancedDataTransformation.coerceToType(11, "object")).toStrictEqual(
      { value: 11 }
    );
  });
});

describe("Deep merge", () => {
  test("Let's have fun with advanced type conversion: ", () => {
    const obj1 = { a: 99, b: 1, c: 2 };
    const obj2 = { a: 8, b: 7, e: 4 };
    const mergedObj = AdvancedDataTransformation.deepMergeWithAddition(
      obj1,
      obj2
    );
    expect(mergedObj).toStrictEqual({ a: 107, b: 8, c: 2, e: 4 });
  });
});
