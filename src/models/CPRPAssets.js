import IPFSProviders from './providers';
const PRPAssets = require('./db').PRPAssets;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';







const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPAssets extends CPRPQuery
{

    constructor()
    {
      super();
      this.storageProvider = IPFSProviders.pinata;
    }
    async testConnectionToStorage()
    {
       return await this.storageProvider.test();
    }
    metaData(file)
    {
       return {
          name: file.name
       };
    }
    async upload(file)
    {
       const {path} = file;
       return this.storageProvider.upload(path, this.metaData(file));
    }
//8f83c818-7d5f-43ef-b5de-0c780d9b5888
    async setMetadata(uuid)
    {
       try{
       const asset = await PRPAssets.findOne({ where: { uuid: uuid } });
       if(art === null)
         return {ok:false, error:'The asset is not found', data:null};

       const data =  await this.storageProvider.setMetadata({name:asset.name,
                                             description:asset.description,
                                             resource:asset.resource
       });
       const update_art = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const updt_asset = await PRPAssets.update({ 
                                                 metadata: data.IpfsHash,
                                                 updatedAt: new Date()
                                                },   
                                                {where: {uuid: uuid}
                                                },
                                                { transaction: t });

               
               return updt_asset;                                      
           });

//       {"IpfsHash":"QmYwAPD9hPmrHErJHcnzGb5Atpa5gyR4oPr9kG6T1FJQiN","PinSize":114,"Timestamp":"2022-02-17T17:41:53.117Z"}  
       return data;
       }
       catch(err) {
            return {ok:false, error:err.message, data: null};
       }
    }

    async get(uuid)
    {
      return this.request(PRPAssets
                         ,CPRPQueryLib.assets.items()
                         ,{uuid: uuid}
                        );

    }
    async list(page, countItems)
    {
      return this.pagination(PRPAssets
                         ,CPRPQueryLib.assets.items()
                         , {state: State.Active}
                         , countItems
                         , page
                        );

    }

    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              const objItem = await PRPAssets.create({  creater: account.uuid,
                                                        subject: obj.subject,
                                                        subject_specification: obj.subject_specification, 
                                                        name: obj.name,
                                                        description: obj.description,
                                                        mime: obj.mime,
                                                        createdAt: new Date(),
                                                        updatedAt: new Date()
                                                     }, { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid, account: data.account_data, name: data.name, subject: data.subect_data}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async update(account, obj)
    {
      try{
           const asset = await PRPAssets.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The asset is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPAssets.update({  creater: account.uuid,
                                                        subject: obj.subject,
                                                        subject_specification: obj.subject_specification, 
                                                        name: obj.name,
                                                        description: obj.description,
                                                        mime: obj.mime,
                                                        updatedAt: new Date()
                                                     }, 
                                                     {where: {uuid: obj.uuid}},

                                                     { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid, account: data.account_data, name: data.name, subject: data.subect_data}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async remove(account, obj)
    {
      try{
           const asset = await PRPAssets.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The asset is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPAssets.update({  state: State.Removed,
                                                        updatedAt: new Date()
                                                     }, 
                                                     {where: {uuid: obj.uuid}},
                                                     { transaction: t });
              return objItem;                                      
           });
           return {ok:true, data: null}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }



}