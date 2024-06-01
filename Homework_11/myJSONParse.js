// 1. **Implement JSON.parse**: Create a JavaScript function called `myJSONParse` that takes a JSON-formatted string as input and returns the corresponding JavaScript object. You should use regular expressions to tokenize and parse the input string.
const fs = require('fs').promises;
const path = require('path');

async function fetchJSON() {
    try {
        const filePath = path.resolve(__dirname, 'example.json');
        const data = await fs.readFile(filePath, 'utf-8');
        const jsonData = JSON.parse(data);
        console.log(jsonData);
        console.log(typeof(jsonData))
    } catch (error) {
        console.error('Error fetching or parsing JSON:', error);
    }
}

fetchJSON();




// function myJSONParse (JSONstr) {
//     return object
// }