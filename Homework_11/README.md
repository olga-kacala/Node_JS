# myJSONParse

`myJSONParse` is a custom implementation of the JSON parsing function, designed to convert JSON-formatted strings into corresponding JavaScript objects using regular expressions.

## Overview

JSON (JavaScript Object Notation) is a lightweight data interchange format. It's easy for humans to read and write, and easy for machines to parse and generate. JSON is built on two structures:

1. **A collection of name/value pairs**: Often realized as an object, record, struct, dictionary, hash table, keyed list, or associative array.
2. **An ordered list of values**: Often realized as an array, vector, list, or sequence.

The JSON syntax is derived from JavaScript object notation syntax:

- **Objects**: `{ "name": "value" }`
- **Arrays**: `[ value1, value2 ]`
- **Values**: string, number, object, array, true, false, null.

## Implementation

Implementing `myJSONParse` was a challenging yet educational experience. The primary difficulty was ensuring that all JSON syntax rules were correctly implemented using regular expressions. Handling nested structures like arrays within objects and vice versa required careful recursive function design. The most significant challenge was maintaining the correct parsing context, especially with nested elements and ensuring all edge cases were covered.

## Explanation and Documentation

1. **Function Declaration**: The `myJSONParse` function is declared with a single parameter, `jsonStr`, which is the JSON string to be parsed.
2. **Tokenization**:
   - The `tokenize` function uses a regular expression to match and extract different JSON elements from the input string.
   - The regular expression `tokenRegex` matches whitespace, strings and literals (true, false, null), numbers, and structural characters (brackets, braces, commas, colons).
   - The tokens are pushed into an array after matching, except for whitespace which is skipped.
3. **Parsing**:
   - The `findTypeof` function determines the type of the current token and delegates parsing to the appropriate function (`parseArray`, `parseObject`, `parseString`, `parseLiteral`).
   - The `parseArray` function handles arrays by recursively calling `findTypeof` for each element until the closing `]` is encountered.
   - The `parseObject` function handles objects by parsing key-value pairs recursively until the closing `}` is encountered.
   - The `parseString` function handles strings by removing the enclosing quotes.
   - The `parseLiteral` function handles the literals `true`, `false`, and `null`.
4. **Error Handling**: Basic error handling is implemented by throwing `SyntaxError` exceptions for unexpected tokens and literals.
