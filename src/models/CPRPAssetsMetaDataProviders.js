const PRPAssetsMetaDataProviders = require('./db').PRPAssetsMetaDataProviders;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';




const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPAssetsMetaDataProviders extends CPRPQuery
{
    constructor()
    {
       super();
    }
    async get(uuid)
    {
      return this.request(PRPAssetsMetaDataProviders
                         ,CPRPQueryLib.assets_meta_data_providers.items()
                         ,{uuid: uuid}
                        );

    }
    async list(page, countItems)
    {
      return this.pagination(PRPAssetsMetaDataProviders
                         ,CPRPQueryLib.assets_meta_data_providers.items()
                         , {state: State.Active}
                         , countItems
                         , page
                        );

    }

    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              const objItem = await PRPAssetsMetaDataProviders.create({  name: obj.name,
                                                        default_item: obj.default_item,
                                                        createdAt: new Date(),
                                                        updatedAt: new Date()
                                                     }, { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid, name: data.name, default_item: data.default_item}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async update(account, obj)
    {
      try{
           const asset = await PRPAssetsMetaDataProviders.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The asset`s metadata provider is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPAssetsMetaDataProviders.update({  name: obj.name,
                                                        default_item: obj.default_item,
                                                        updatedAt: new Date()
                                                     }, 
                                                     {where: {uuid: obj.uuid}},

                                                     { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid, name: data.name, default_item: data.default_item}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async remove(account, obj)
    {
      try{
           const asset = await PRPAssetsMetaDataProviders.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The asset`s metadata provider is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPAssetsMetaDataProviders.update({  state: State.Removed,
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