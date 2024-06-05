/**
 * Custom implementation of JSON.parse to convert JSON-formatted strings 
 * into corresponding JavaScript objects using regular expressions.
 * 
 * @param {string} jsonStr - The JSON string to parse.
 * @returns {Object} The parsed JavaScript object.
 */
function myJSONParse(jsonStr) {
  const tokens = tokenize(jsonStr);
  let current = 0;

  /**
   * Tokenize the input JSON string.
   * 
   * @param {string} str - The JSON string to tokenize.
   * @returns {Array} An array of tokens.
   */
  function tokenize(str) {
    // Regular expression to match JSON elements
    const tokenRegex = /(\s+)|(".*?"|true|false|null)|(\d+\.?\d*|\.\d+)|([\[\]\{\},:])/g;
    const tokens = [];
    let match;

    // Execute the regular expression to extract tokens
    while ((match = tokenRegex.exec(str))) {
      if (match[1]) continue; // Skip whitespace
      if (match[2]) tokens.push(match[2]); // Strings and literals
      if (match[3]) tokens.push(parseFloat(match[3])); // Numbers
      if (match[4]) tokens.push(match[4]); // Structural characters
    }

    return tokens;
  }

  /**
   * Determine the type of the next token and parse accordingly.
   * 
   * @returns {*} The parsed value (object, array, string, number, boolean, or null).
   */
  function findTypeof() {
    const token = tokens[current];

    if (token === "[") {
      return parseArray();
    } else if (token === "{") {
      return parseObject();
    } else if (typeof token === "string") {
      if (token[0] === '"') {
        return parseString();
      } else {
        return parseLiteral();
      }
    } else if (typeof token === "number") {
      current++;
      return token;
    }

    throw new SyntaxError("Unexpected token: " + token);
  }

  /**
   * Parse an array.
   * 
   * @returns {Array} The parsed array.
   */
  function parseArray() {
    const arr = [];
    current++; // Skip '['

    while (tokens[current] !== "]") {
      if (tokens[current] === ",") current++; // Skip commas
      arr.push(findTypeof());
    }

    current++; // Skip ']'
    return arr;
  }

  /**
   * Parse an object.
   * 
   * @returns {Object} The parsed object.
   */
  function parseObject() {
    const obj = {};
    current++; // Skip '{'

    while (tokens[current] !== "}") {
      if (tokens[current] === ",") current++; // Skip commas

      const key = parseString();
      current++; // Skip ':'
      const value = findTypeof();
      obj[key] = value;
    }

    current++; // Skip '}'
    return obj;
  }

  /**
   * Parse a string.
   * 
   * @returns {string} The parsed string.
   */
  function parseString() {
    const str = tokens[current];
    current++;
    return str.slice(1, -1); // Remove quotes
  }

  /**
   * Parse literals (true, false, null).
   * 
   * @returns {*} The parsed literal (boolean or null).
   */
  function parseLiteral() {
    const literal = tokens[current];
    current++;

    if (literal === "true") return true;
    if (literal === "false") return false;
    if (literal === "null") return null;

    throw new SyntaxError("Unexpected literal: " + literal);
  }

  // Start the parsing process
  return findTypeof();
}


// Test the function

const fs = require("fs").promises;
const path = require("path");

//Test function showing how fetch JSON file looks without parsing
async function fetchJSONstr() {
  try {
    const filePath = path.resolve(__dirname, "example.json");
    const data = await fs.readFile(filePath, "utf-8");
    console.log(
      "fetching JSON data without parsing returns type of: ",
      typeof data
    );
    console.log(data);
  } catch (error) {
    console.error("Error fetching or parsing JSON:", error);
  }
}

//Test function showing how fetch JSON file looks after using custom build pasring function 
async function fetchJSON() {
  try {
    const filePath = path.resolve(__dirname, "example.json");
    const data = await fs.readFile(filePath, "utf-8");
    const parsedData = myJSONParse(data);
    console.log(
      "fetching JSON data with custom build parsing returns type of: ",
      typeof parsedData
    );
    console.log(parsedData);
  } catch (error) {
    console.error("Error fetching or parsing JSON:", error);
  }
}

fetchJSONstr();
fetchJSON();

