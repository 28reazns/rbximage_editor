#!/usr/bin/env node
const fs = require('fs');
const https = require('https');
const Jimp = require('jimp').Jimp;


const ids = (process.argv[2] && process.argv[2].split(","))
console.log(ids)

async function getData(id) {
  const url = "https://assetdelivery.roproxy.com/v1/asset?id=" + id;
  https.get(url, (response) => {
    if(response.statusCode!=200){
      fs.unlink("images/" + id + ".png"); // Delete the file if an error occurs
      console.error(err);
      return false
    }else{
      const file = fs.createWriteStream("images/" + id + ".png");
      response.pipe(file);

      file.on('finish', () => {
        file.close();
      });
      return true;
    }
  }).on('error', (err) => {
    fs.unlink("images/" + id + ".png"); // Delete the file if an error occurs
    console.error(err);
    return false;
  });
}

async function loadIds() {
  let downloadedfiles = 0;
  if (ids){
    ids.forEach(element => {
      getData(element).then((bool)=>{
        console.log(bool)
        if(bool){
          downloadedfiles+=1
        }
      })
    });
    return downloadedfiles
  }
  return -1
  
}

loadIds().then((downloaded)=>{
  console.log("Successfully Downloaded "+downloaded+" files.")
})



