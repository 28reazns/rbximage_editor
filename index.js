#!/usr/bin/env node
const fs = require('fs');
const https = require('https');
const Jimp = require('jimp').Jimp;


const ids = (process.argv[2].split(","))


async function getData(id) {
  const url = "https://assetdelivery.roproxy.com/v1/asset?id=" + id;
  https.get(url, (response) => {
    const file = fs.createWriteStream("images/" + id + ".png");
    response.pipe(file);

    file.on('finish', () => {
      file.close();
      return true;
    });
  }).on('error', (err) => {
    fs.unlink(filePath); // Delete the file if an error occurs
    console.error(err);
    return false;
  });
}

async function loadIds() {
  let downloaded = 0;
  if (ids){
    ids.forEach(element => {
      getData(element).then((bool)=>{
        if(bool){
          downloaded+=1
        }
      })
    });
  }
  return downloaded
}

loadIds().then((downloaded)=>{
  console.log("Successfully Downloaded "+downloaded+" files.")
})



