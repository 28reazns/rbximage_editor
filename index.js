#!/usr/bin/env node
const fs = require('fs');
const https = require('https');
const Jimp = require('jimp').Jimp;


const ids = (process.argv[2] && process.argv[2].split(","))
console.log(ids)


function getData(id,callback) {
  const url = "https://assetdelivery.roproxy.com/v1/asset?id=" + id;
  https.get(url, (response) => {
    if (response.statusCode != 200) {
      fs.unlink("images/" + id + ".png"); // Delete the file if an error occurs
      console.error(err);
      callback(false)
    } else {
      const file = fs.createWriteStream("images/" + id + ".png");
      response.pipe(file);

      file.on('finish', () => {
        file.close();
      });
      callback(true)
    }
  }).on('error', (err) => {
    fs.unlink("images/" + id + ".png"); // Delete the file if an error occurs
    console.error(err);
    callback(false)
  });
}

async function loadIds(callback) {
  let downloadedfiles = 0;
  if (ids) {
    let count = 0
    for (element of ids) {

      getData(element,bool => {
        count+=1
        if (bool) {
          downloadedfiles += 1
          if(count==ids.length){
            callback(downloadedfiles)
          }
        }
      })

    }
  }else{
    callback(0)
  }

}

loadIds((downloaded) => {
  console.log("Successfully Downloaded " + downloaded + " files.")
})


