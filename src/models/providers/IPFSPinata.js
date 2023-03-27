const pinataSDK = require('@pinata/sdk');
const fs = require("fs");

require('dotenv').config();

export default class IPFSPinata
{
   constructor()
   {
     this.pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_PRIVATE_KEY);
   }
   
   async test()
   {
      const result = await this.pinata.testAuthentication();
      return result;
   }
   async upload(path, metaData){
    const fs = require('fs');
    const readableStreamForFile = fs.createReadStream(path);
    const options = {
       pinataMetadata: metaData,
       pinataOptions: {
          cidVersion: 0
       }
    };
    return this.pinata.pinFileToIPFS(readableStreamForFile, options);
  }
  async setMetadata(data)
  {
    const options = {
       pinataMetadata: {
         name: data.name,
       },
       pinataOptions: {
          cidVersion: 0
       }
    };
   const dataJson = {name:data.name
                    ,description:data.description
                    ,image:'ipfs://ipfs/' + data.resource
   }
   return await this.pinata.pinJSONToIPFS(dataJson, options);

  }
}