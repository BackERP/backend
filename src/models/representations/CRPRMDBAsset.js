
import {MONGODB}  from '../../config/config';
import { map } from 'modern-async'
import { MongoClient } from "mongodb";
import CRPRMDBMarketRepresentations from './CRPRMDBMarketRepresentations';
import CPRPAssets from '../CPRPAssets';
import CPRPMarkets from '../CPRPMarkets';
import CPRPCommonHelper from '../../helpers/CPRPCommonHelper';


                     
export default class CRPRMDBAsset extends CRPRMDBMarketRepresentations
{
    constructor()
    {
      super('AssetMarket');
    }

    async fillAsset(market, asset)
    {
      const language = market.locale_data.language_data.short.toLowerCase();

      const fields = [{ name: 'name',
                  value: await CPRPCommonHelper.translate(asset.name, language)
                },
                { name: 'description',
                  value: await CPRPCommonHelper.translate(asset.description, language)
                },
      ]
      return await this.save(market.uuid, asset.uuid, fields);
    }

    async fillByMarket(market)
    {
       const result = await (new CPRPAssets).list(-1);
       if(!result.ok)
         return;
       const assets = result.data;
       const data = await map(assets, async (asset)=>{
         return {asset: asset.uuid, fields: await this.fillAsset(market, asset)}
       });
       return {assets: data};
    }
    async fillFromAccounting()
    {

       const result = await (new CPRPMarkets).list(-1);
       if(!result.ok)
         return;

       const markets = result.data;
       const data = await map(markets, async (market)=>{
         return {market: market.uuid, subject: await this.fillByMarket(market)}
       });
       return {ok:true, error:'', data: {markets: data}};
    }

}