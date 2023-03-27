import CPRPAssets from '../models/CPRPAssets';
const formidable = require('formidable');
const fs = require("fs");
import { v4 as uuid } from 'uuid';
import {FILESTORAGEPATH, SERVER_URL} from '../config/config';
import CPRPCommonHelper from '../helpers/CPRPCommonHelper';









  const getFilePath = async (req) => {
     var form = new formidable.IncomingForm();
     return await new Promise(function (resolve, reject) {
        form.parse(req, function (err, fields, files) {
            resolve({path: files.image.path, name: files.image.name});
        }); 
     });
  };     
  const makeFileName = (file)=>
  {
    const fileParts = file.name.split('.');
    let ext = 'dat';
    if(fileParts.length > 1)
      ext = fileParts[fileParts.length - 1];
    return  uuid() + "." + ext;

  }                                                            
  const copyFile = (file)=>{
    const target = makeFileName(file);
    fs.writeFileSync('./' + FILESTORAGEPATH  + target, fs.readFileSync(file.path));
    return target;
  }

module.exports = {                         

  async testAuthStorage(req, res){
      const {authenticated} = await (new CPRPAssets()).testConnectionToStorage();
      if(authenticated)
         res.json({
            data:{},
            error: '',
            ok: true
         });
      else
         res.json({
            error: 'The server doesn`t authenticated on the IPFS provider',
            ok: false
         });
  },


  async upload(req, res){
     try{
       const file = await getFilePath(req);
       const IPFSData = await (new CPRPAssets()).upload(file);
       res.json({ok:true, data:{ipfs:IPFSData, link_address:CPRPCommonHelper.pathIPFS(IPFSData.IpfsHash)}});
      }catch(err)
      {
        console.log(err);
        res.json({ok:false, error:err.message});
      }
  },

  async setMetadata(req, res){
    const {uuid} = req.query;
    const data = await (new CPRPAssets()).setMetadata(uuid);
    res.json(data);
  },
 

// File "destination.txt" will be created or overwritten by default.
  async uploadFile(req, res){
    const file = await getFilePath(req);
    const fileName = copyFile(file);
    res.json({ok:true, error:'', data:{filename:fileName, link_address:CPRPCommonHelper.pathLocal(fileName)}});
  },
}
