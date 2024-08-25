# loguser-data

## parseJSON

You can add this to your own website but please leave credit. You can modify the code and connect it to your dashboard etc. Change the style according to your preference.
Create variables to store the userdata, and using JSON is strongly recommended for data storage instead of usernames and passwords, as it is already done using Roblox.

Example:

```json
{
    "exampleuser": {
        "money" : 100,
        "kills": 34,
        "friends": 200
    },

    "exampleuser2": {
        "money" : 382,
        "kills": 68,
        "friends": 37
    }
}
```
Note: these aren't actual values; adjust the values to the use cases of your website.

```javascript
const fs = require('fs');
const path = './data.json'; // Default path to the JSON file change it to your liking

/**
 * Log user data to the data.json file.
 * @param {string} input - The input string containing key-value pairs.
 * @param {string} filePath - Optional custom path to the JSON file.
 */
function parseJSON(input, filePath) {
    console.log(`-----------------------------\nHello user, You are using parseJSON! Kindly change the constant 'path' to your desired path.\nYour current path is set to ${path}\n-----------------------------\n\n\n`)
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
```

Here is my `Module Code` you can edit the code for it but please leave credit you can also install it (tutorial provided below)! Add this to my javascript code then use:

```javascript
parseJSON("user: captainhackerguy, skins: 1", "./data.json")
```

You can `add/remove values` if you want its your choice!

```javascript

parseJSON("user: dr, optic: halov2", "./data2.json")

```

Note: These values use `strings` you can change them to `booleans/integers/varables` like:

```javascript

parseJSON(`user: ${username}, gems: ${gems}, dead: False`) // Examples of Integers/Variables/Booleans

```
Feel free to add more values to your liking...


## Package Installation

**Head over to terminal and type:**

```bash
npm i loguser-data
```

**Setting Up a .json File:** Create a file with the .json extention and then type {} in it and its done! 
While running parseJSON("", <filepath>) give the file directory in the 2nd value and your good to go!

usage:
```javascript
parseJSON("user: captainhackerguy, val1: value, val2: value", path) // You can add an infinite amount of values. Make sure to use user at the start or else it will appear as undefined.
```



## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/CaptainHackerGuy/loguser-data?tab=MIT-1-ov-file) file for details.
