
import {State} from './enums/State';
import {AssetProviders} from './enums/AssetProviders';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';
import CPRPAssetsResources from './CPRPAssetsResources';
import CPRPBookRecords from './CPRPBookRecords';
import CPRPDocumentSpecifications from './CPRPDocumentSpecifications';
import {Books} from './enums/Books';






const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPAssetMarket extends CPRPQuery
{
    constructor()
    {
      super();
    }

    async get(market, object_uuid)
    {
      try{
           const asset_reources = await (new CPRPAssetsResources).getByAssetProviderData(object_uuid, AssetProviders.PinataIPFS);
           const asset_reources_original = await (new CPRPAssetsResources).getByAssetProviderData(object_uuid, AssetProviders.Physically);
           let asset_reource;
           let asset_reource_original;

           if(asset_reources.length > 0)
             asset_reource = asset_reources[0];
           if(asset_reources_original.length > 0)
             asset_reource_original = asset_reources_original[0];

           let issue = 0;
           let rest = 0;
           let price = 0;
           let price_original = 0;
           let reserved = 0;
           let rest_original = 0;
           let income_original = 0;

           if(asset_reources != undefined)
           {
             const issues = await (new CPRPBookRecords).findAssetInBooks([Books.issues], object_uuid);
             issue = issues.reduce((t,o)=>t + Number(o.reg_specification_data.quantity), 0);
             rest = issues.reduce((t,o)=>t + Number(o.quantity), 0);
             const reserves = await (new CPRPBookRecords).findAssetInBooks([Books.reserves], object_uuid);

             reserved = reserves.reduce((t,o)=>t + Number(o.quantity), 0);

             const offer_specs = await (new CPRPDocumentSpecifications).findAssetMarketData(market, object_uuid, asset_reource.uuid);

             if(offer_specs.length > 0)
               price = offer_specs[0].price;

           } 
           if(asset_reource_original != undefined)
           {
             const incomes = await (new CPRPBookRecords).findAssetInBooks([Books.income], object_uuid);
             income_original = incomes.reduce((t,o)=>t + Number(o.reg_specification_data.quantity), 0);
             rest_original = incomes.reduce((t,o)=>t + Number(o.quantity), 0);
             const offer_specs = await (new CPRPDocumentSpecifications).findAssetMarketData(market, object_uuid, asset_reource_original.uuid);
             if(offer_specs.length > 0)
               price_original = offer_specs[0].price;

           }


           return this.returnData({ issue,
                                    rest,
                                    price,
                                    price_original,
                                    reserved,
                                    rest_original,
                                    income_original,            
                  });


        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }

    }
}