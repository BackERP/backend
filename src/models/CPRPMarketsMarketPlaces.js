const PRPMarketsMarketPlaces = require('./db').PRPMarketsMarketPlaces;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';




const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPMarketsMarketPlaces extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async get(uuid)
    {
      return this.request(PRPMarketsMarketPlaces
                         ,CPRPQueryLib.market_marketplace.items()
                         ,{uuid: uuid}
                        );

    }
    async list(page, countItems)
    {
      return this.pagination(PRPMarketsMarketPlaces
                         ,CPRPQueryLib.market_marketplace.items()
                         , {state: State.Active}
                         , countItems
                         , page
                        );
    }

    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              const objItem = await PRPMarketsMarketPlaces.create({ marketplace: obj.marketplace,
                                                                    market:obj.market,
                                                                    activeMarket:obj.activeMarket,
                                                                    createdAt: new Date(),
                                                                    updatedAt: new Date()
                                                                  }, { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async update(account, obj)
    {
      try{
           const asset = await PRPMarketsMarketPlaces.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The market marketplace is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPMarketsMarketPlaces.update({ marketplace: obj.marketplace,
                                                                    market:obj.market,
                                                                    activeMarket:obj.activeMarket,
                                                                    updatedAt: new Date()
                                                                  }, 
                                                                  {where: {uuid: obj.uuid}},
                                                                  { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async remove(account, obj)
    {
      try{
           const asset = await PRPMarketsMarketPlaces.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The market marketplace is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPMarketsMarketPlaces.update({  state: State.Removed,
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