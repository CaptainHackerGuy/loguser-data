const path = './data.json'; // Default path to the JSON file change it to your liking
const fs = require("fs")

/**
 * Log user data to the data.json file.
 * @param {string} input - The input string containing key-value pairs.
 * @param {string} filePath - Optional custom path to the JSON file.
 */
function parseJSON(input, filePath) {
    console.log(`-----------------------------\nHello user, You are using parseJSON!\n-----------------------------\n\n\n`)
    // Parse the input string into an object
    const keyValuePairs = input.split(',').reduce((acc, pair) => {
        let [key, value] = pair.split(':').map(str => str.trim());

        // Convert "true"/"false" strings to boolean values and numeric strings to numbers
        if (value.toLowerCase() === 'true') value = true;
        else if (value.toLowerCase() === 'false') value = false;
        else if (!isNaN(value)) value = parseFloat(value);

        acc[key] = value;
        return acc;
    }, {});

    // Extract the user identifier from the parsed object
    const user = keyValuePairs['user'];
    delete keyValuePairs['user']; // Remove 'user' from the object to keep other data

    // Read the existing data from the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (e) {
            console.error('Error parsing JSON:', e);
            return;
        }

        // Add or update user data
        jsonData[user] = keyValuePairs;

        // Write the updated data back to the file
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 4), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to the file:', err);
                return;
            }
            console.log(`-----------------------------\nUser data added/updated successfully.\nLogs {\n  Update: "Modified ${path}\n  key="undefined"\n}\n-----------------------------\n\n\n`)
        });
    });
}

module.exports = parseJSON;