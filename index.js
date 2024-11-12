const fs = require('fs');
const ids = [11949079608,18673323656,18673328643,18673141145,18673147291,18673330756,18673373573,18673131661,18673320594,18673365868,11949079270,18673153270,11949079983,18673159095,18673150657,18673371350,18673144086,11949079404,11949076158,18673368862,18673314896,18673362599,18673161633,18673134296,18673127791,18673326379,18673138734,11949079156,18673378942,11949079854,18672421686,18673156161,11949075893,18673318129,18673376261,18673136690];
const https = require('https');
const Jimp = require('jimp').Jimp;


async function getData(id) {
    const url = "https://assetdelivery.roproxy.com/v1/asset?id="+id;
    https.get(url, (response) => {
      const file = fs.createWriteStream("images/"+id+".png");
      response.pipe(file);
    
      file.on('finish', () => {
        file.close();

        let image = Jimp.read(file.path).then(image=>{
          image.color([
            { apply: "lighten", params: [100] },
          ]).write(file.path);
        })

        console.log('File downloaded successfully!');
      });
    }).on('error', (err) => {
      fs.unlink(filePath); // Delete the file if an error occurs
      console.error(err);
    });
  }
  

  ids.forEach(element => {
    getData(element)
  });