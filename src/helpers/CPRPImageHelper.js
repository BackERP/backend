const fs = require("fs");
const path = require('path');
const sharp = require('sharp');

const dir = 'files';
const outdir = dir + '/minimized/';

export default class CPRPImageHelper
{

  static isImage(filename)
  {
     var fileExt = filename.split('.').pop();
     if(fileExt === 'jpg' || fileExt === 'jpeg'|| fileExt === 'gif'|| fileExt === 'png' || fileExt === 'svg')
       return true;
     return false;
  }
  static async minimizeAll()
  {
//     const directoryPath = path.join(__dirname, 'Files');

     try {
       const files = (await fs.promises.readdir(dir)).filter((filename)=>CPRPImageHelper.isImage(filename));
       for(let filename of files)
         await sharp(dir + '/' + filename)
              .resize(300)
              .toFile(outdir + filename);
       
       return files;


     } catch (err) {
        console.error('Error occurred while reading directory!', err);
     }
  }
  static async minimize(filename)
  {
     if(!CPRPImageHelper.isImage(filename))
        return;
     return await sharp(dir + '/' + filename)
                 .resize(300)
                 .toFile(outdir + filename);

  }

}