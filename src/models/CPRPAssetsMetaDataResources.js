const PRPAssetsMetaDataResources = require('./db').PRPAssetsMetaDataResources;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';




const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPAssetsMetaDataResources extends CPRPQuery
{
    constructor()
    {
       super();
    }
    async get(uuid)
    {
      return this.request(PRPAssetsMetaDataResources
                         ,CPRPQueryLib.assets_meta_data_resources.items()
                         ,{uuid: uuid}
                        );

    }
    async list(asset, page, countItems)
    {
      return this.pagination(PRPAssetsMetaDataResources
                         ,CPRPQueryLib.assets_meta_data_resources.items()
                         , {state: State.Active, asset: asset}
                         , countItems
                         , page
                        );

    }

    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              const objItem = await PRPAssetsMetaDataResources.create({  asset: obj.asset,
                                                                         provider: obj.provider,
                                                                         resource: obj.resource,
                                                                         default_item: obj.default_item,
                                                                         createdAt: new Date(),
                                                                         updatedAt: new Date()
                                                                       }, { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid, asset: data.asset_data, provider: data.provider_data, resource:data.resource, default_item: data.default_item}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async update(account, obj)
    {
      try{
           const asset = await PRPAssetsMetaDataResources.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The asset`s metadata resource is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPAssetsMetaDataResources.update({  asset: obj.asset,
                                                                         provider: obj.provider,
                                                                         resource: obj.resource,
                                                                         default_item: obj.default_item,
                                                                         updatedAt: new Date()
                                                                      }, 
                                                                      {where: {uuid: obj.uuid}},
                                                                      { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid, asset: data.asset_data, provider: data.provider_data, resource:data.resource, default_item: data.default_item}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async remove(account, obj)
    {
      try{
           const asset = await PRPAssetsMetaDataResources.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The asset`s metadata resource is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPAssetsMetaDataResources.update({  state: State.Removed,
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