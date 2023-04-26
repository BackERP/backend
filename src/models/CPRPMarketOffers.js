const PRPMarketOffers = require('./db').PRPMarketOffers;
import {State} from './enums/State';
import {StateMarketOffer} from './enums/StateMarketOffer';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';





const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPMarketOffers extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async get(uuid)
    {
      return this.request(PRPMarketOffers
                         ,CPRPQueryLib.market_offers.items()
                         ,{uuid: uuid}
                        );

    }
    async list(page, countItems)
    {
      return this.pagination(PRPMarketOffers
                         ,CPRPQueryLib.market_offers.items()
                         , {state: State.Active}
                         , countItems
                         , page
                        );
    }
    async findData(market, offer)
    {
      return this.requestData(PRPMarketOffers
                         ,CPRPQueryLib.market_offers.items()
                         ,{state: State.Active, market, offer, stateMarket: StateMarketOffer.Active}
                        );

    }


    async setOffer(account, market, offer)
    {
       const marketoffers = await this.findData(market, offer);
       let source_offer;
       if(marketoffers.length > 0)
       {
          const marketoffer = marketoffers[0];
          source_offer = marketoffer.offer_data.uuid;

          await this.updateTrn(t, account, { uuid: marketoffer.uuid,
                                             market: marketoffer.market_data.uuid,
                                             offer: marketoffer.offer_data.uuid,
                                             source_offer:marketoffer.source_offer.uuid,
                                             order:marketoffer.order,
                                             stateMarket:StateMarketOffer.Cancel,
          });
       }
       return  await this.createTrn(t, account, { market: market,
                                                  offer: offer,
                                                  source_offer:source_offer,
                                                  order:0,
                                                  stateMarket:StateMarketOffer.Active,

               });
    }

    async createTrn(t, account, obj)
    {
        return await PRPMarketOffers.create({  market: obj.market,
                                               offer: obj.offer,
                                               source_offer:obj.source_offer,
                                               order:obj.order,
                                               stateMarket:obj.stateMarket,
                                               createdAt: new Date(),
                                               updatedAt: new Date()
                                               }, { transaction: t });
    }


    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              return await this.createTrn(t, account, obj);
           });
           return {ok:true, data: {uuid: data.uuid}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async updateTrn(t, account, obj)
    {
       return await PRPMarketOffers.update({ market: obj.market,
                                             offer: obj.offer,
                                             source_offer:obj.source_offer,
                                             order:obj.order,
                                             stateMarket:obj.stateMarket,
                                             updatedAt: new Date()
                                           }, 
                                           {where: {uuid: obj.uuid}},
                                           { transaction: t });
    }

    async update(account, obj)
    {
      try{
           const asset = await PRPMarketOffers.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The market offer is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              return await this.updateTrn(t, account, obj);
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
           const asset = await PRPMarketOffers.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The market offer is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPMarketOffers.update({  state: State.Removed,
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