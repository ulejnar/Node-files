const fs = require('fs');
const axios = require("axios"); 

let source = process.argv[process.argv.length-1];

/** Attempts to read file at path,
 * displays content if successful, error otherwise. */ 

async function cat (path){
    fs.readFile(path, 'utf8', function(err, data){

        
    }
}

/** Attempts to GET a URL, displays the content
 * if successful, error otherwise. */

async function webCat(url) {
  let response = await axios.get(url)
    .then(d => d.data)
    .catch(e => `Error fetching ${url}:\n ${e.message}`);
    return response;
}

/** Determines if the source is a file path or URL 
 * and calls the relevent function.
 */

async function generalCat(source) {
    let content
  if (source.startsWith("http")) {
    content = await webCat(source);
    console.log("CONTENT"  , content)
  } else {
    content = await cat(source);
    console.log("CONTENT"  , content)
  }
  console.log("content", content)
  if(process.argv[2]==='--out'){
      console.log("SUCCESS!!!!!!!!!!!!!!!!!!!!!!!!!!")
    writeToFile(content);
    }else{
  console.log(content);
  }
}

function writeToFile (content){
    fs.writeFile(process.argv[3], content, "utf8", function(err){
        if(err) {
            console.log(err)
            process.exit(1)
        }
        console.log ("Successfully wrote to file")
    })
}

generalCat(source);
