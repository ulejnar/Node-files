const fs = require('fs'); 
const axios = require('axios');

let path = process.argv[2]

function cat (path){
    fs.readFile(path, 'utf8', function(err, data){
        if(err){
            console.log(`Error:
            ${err.message}`)
        }
        console.log(`file contents: ${data}`);
    })
}

function webCat (path){
    axios.get(path).then(function(resp) {
        console.log(resp.data)
    }).catch(err => console.log(err.message))
}

path[0] != 'h' ? cat(path): webCat(path);
    