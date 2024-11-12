#!/usr/bin/env node
const fs = require('fs');
const https = require('https');
const Jimp = require('jimp').Jimp;

const ids = (process.argv[2] && process.argv[2].split(",")) | "".split("")

async function getData(id) {
  const url = "https://assetdelivery.roproxy.com/v1/asset?id=" + id;
  https.get(url, (response) => {
    const file = fs.createWriteStream("images/" + id + ".png");
    response.pipe(file);

    file.on('finish', () => {
      file.close();
      console.log('File downloaded successfully!');
    });
  }).on('error', (err) => {
    fs.unlink(filePath); // Delete the file if an error occurs
    console.error(err);
  });
}

if (ids){
  ids.forEach(element => {
    getData(element)
  });
}

console.log("Successfully Downloaded "+((ids && ids.length)|0)+" files.")