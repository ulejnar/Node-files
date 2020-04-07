const fs = require('fs');
const axios = require("axios"); 

let source = process.argv[2];

/** Attempts to read file at path,
 * displays content if successful, error otherwise. */ 

function cat (path){
    fs.readFile(path, 'utf8', function(err, data){
        if(err){
            console.log(`Error: ${err.message}`)
            process.exit(1)
        }
        console.log(`file contents: ${data}`);
    })
}

/** Attempts to GET a URL, displays the content
 * if successful, error otherwise. */

function webCat(url) {
  axios.get(url)
    .then(d => {console.log(d.data)})
    .catch(e => {console.log(`Error fetching ${url}:\n`
                              ,e.message)});
}

/** Determines if the source is a file path or URL 
 * and calls the relevent function.
 */

function generalCat(source) {
  if (source.startsWith("http")) {
    webCat(source);
  } else {
    cat(source);
  }
}

generalCat(source);


// const fs = require('fs'); 
// const axios = require('axios');

// let path = process.argv[2]

// function cat (path){
//     fs.readFile(path, 'utf8', function(err, data){
//         if(err){
//             console.log(`Error:
//             ${err.message}`)
//         }
//         console.log(`file contents: ${data}`);
//     })
// }

// function webCat (path){
//     axios.get(path).then(function(resp) {
//         console.log(resp.data)
//     }).catch(err => console.log(err.message))
// }

// path[0] != 'h' ? cat(path): webCat(path);
    

