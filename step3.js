const fs = require('fs');
const axios = require("axios");

let source = process.argv[process.argv.length - 1];
let flag = process.argv[2];
let out = process.argv[3];

/** Attempts to read file at path,
 * displays content if successful, error otherwise. */

function cat(path) {
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
      manageContent(`Error: ${err.message}`, true);
    } else {
      manageContent(data);
    }
  })
}

/** Attempts to GET a URL, displays the content
 * if successful, error otherwise. */

async function webCat(url) {
  try {
    let response = await axios.get(url)
    manageContent(response.data);
  } catch(e) {
    manageContent(e.message, true)
  } 

  
}

/** Determines if the source is a file path or URL 
 * and calls the relevent function.
 */

async function generalCat(source) {
  if (source.startsWith("http")) {
    await webCat(source);
  } else {
    cat(source);
  }
}

/** If we have an "out" flag, and no error, 
 * write the content to file, otherwise print to console. */

function manageContent(content, err) {
  if (flag === '--out' && !(err)) {
    writeToFile(content);
  } else {
    console.log(content);
  }
}

/** Use fs.writeFile to write content to file */

function writeToFile(content) {
  fs.writeFile(out, content, "utf8", function (err) {
    if (err) {
      console.log(err.message)
      process.exit(1)
    } else {
    console.log("Successfully wrote to file")
    }
  })
}

generalCat(source);


