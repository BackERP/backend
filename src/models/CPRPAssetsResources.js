const PRPAssetsResources = require('./db').PRPAssetsResources;
import {State} from './enums/State';
import {AssetProviders} from './enums/AssetProviders';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';
import CPRPCommonHelper from '../helpers/CPRPCommonHelper';
import DefaultSetting from './config/DefaultSetting';





const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;
                                                  



export default class CPRPAssetsResources extends CPRPQuery
{
    constructor()
    {
       super();
    }

    async convertData(records)
    {
       return records.map(obj=>{obj.link_address = CPRPCommonHelper.pathByProvider(obj.provider_data.name, obj.resource); return obj;});
    }

    async get(uuid)
    {
      return this.request(PRPAssetsResources
                         ,CPRPQueryLib.assets_resources.items()
                         ,{uuid: uuid}
                         ,this.convertData
                        );

    }
    async getByAssetProvider(asset, provider)
    {
      return this.request(PRPAssetsResources
                         ,CPRPQueryLib.assets_resources.items()
                         ,{asset: asset, provider: provider, state: State.Active}
                         ,this.convertData
                        );

    }
    async getByAssetProviderData(asset, provider)
    {
      return this.requestData(PRPAssetsResources
                         ,CPRPQueryLib.assets_resources.items()
                         ,{asset: asset, provider: provider, state: State.Active}
                         ,this.convertData
                        );

    }


    async list(asset, page, countItems)
    {
      return this.pagination(PRPAssetsResources
                         ,CPRPQueryLib.assets_resources.items()
                         , {state: State.Active, asset: asset}
                         , countItems
                         , page
                         ,this.convertData
                        );
    }
    async getAllDefault(page, countItems)
    {
      return this.pagination(PRPAssetsResources
                         ,CPRPQueryLib.assets_resources.items()
                         , {state: State.Active, default_item: true}
                         , countItems
                         , page
                         ,this.convertData
                        );
    }

    async getData(uuid)
    {
      return this.requestData(PRPAssetsResources
                         ,CPRPQueryLib.assets_resources.items()
                         , {uuid: uuid}
                        );
    }

    async listDataByProvider(provider)
    {
      return this.requestData(PRPAssetsResources
                         ,CPRPQueryLib.assets_resources.items()
                         , {state: State.Active, provider: provider}
                        );
    }
    async listDataByPinataIPFS()
    {
       return this.listDataByProvider(AssetProviders.PinataIPFS);
    }
    async listDataByPhysically()
    {
       return this.listDataByProvider(AssetProviders.Physically);
    }
    async listDataByAssetProvider(asset, provider)
    {
      return this.requestData(PRPAssetsResources
                         ,CPRPQueryLib.assets_resources.items()
                         , {state: State.Active, asset:asset, provider: provider}
                        );
    }
    async resourcePinataIPFS(asset)
    {
       return this.listDataByAssetProvider(asset, AssetProviders.PinataIPFS)
    }
    async resourcePhysically(asset)
    {
       return this.listDataByAssetProvider(asset, AssetProviders.Physically)
    }


    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              if(obj.default_item)
              {
                 await PRPAssetsResources.update({ default_item: false,
                                                   updatedAt: new Date()
                                                 }, 
                                                 {where: {asset: obj.asset}},
                                                 { transaction: t });
              }
              const objItem = await PRPAssetsResources.create({  asset: obj.asset,
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
           const asset = await PRPAssetsResources.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The asset`s resource is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {


              if(obj.default_item)
              {
                 await PRPAssetsResources.update({ default_item: false,
                                                   updatedAt: new Date()
                                                 }, 
                                                 {where: {asset: obj.asset}},
                                                 { transaction: t });
              }
    // your transactions
              const objItem = await PRPAssetsResources.update({  asset: obj.asset,
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
           const asset = await PRPAssetsResources.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The asset`s resource is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPAssetsResources.update({  state: State.Removed,
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

    async prepSpeInfo(account, assetResource, price, quantity, is_physic, price_physic)
    {
       const resource = (await this.get(assetResource)).data[0];

       if(resource == null) 
          throw new Error('The asset`s resource is not found');

       const specInfo = {
          subject: resource.asset_data.subject_data.uuid,
          currency:DefaultSetting.currency,
          sum: 0.0,
          items:[{                                       
                   subject: resource.asset_data.subject_data.uuid,
                   asset: resource.asset_data.uuid,
                   assetProvider: resource.provider_data.uuid, 
                   resource: assetResource,
                   currency:DefaultSetting.currency,
                   price: price,
                   quantity: quantity,
                   sum: price*quantity,
                   account: account.uuid
                }]
       }
       if(is_physic && resource.provider_data.uuid != DefaultSetting.physicProvider)
       {
          const physicResource = (await this.getByAssetProvider(resource.asset_data.uuid, DefaultSetting.physicProvider)).data[0];
          if(physicResource == null)
            throw new Error('The asset has no physical implementation');

          specInfo.items.push({
                          subject: resource.asset_data.subject_data.uuid,
                          asset: resource.asset_data.uuid,
                          assetProvider: DefaultSetting.physicProvider, 
                          resource: physicResource.uuid,
                          currency:DefaultSetting.currency,
                          price: price_physic,
                          quantity: 1,
                          sum: price_physic,
                          account: account.uuid
                       });
       }
       specInfo.sum = specInfo.items.reduce((total, obj)=>total + obj.sum, specInfo.sum);
       return specInfo;

    }

}