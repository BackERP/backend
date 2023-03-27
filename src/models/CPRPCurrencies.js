const PRPCurrencies = require('./db').PRPCurrencies;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';




const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPCurrencies extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async get(uuid)
    {
      return this.request(PRPCurrencies
                         ,CPRPQueryLib.currencies.items()
                         ,{uuid: uuid}
                        );

    }
    async list(page, countItems)
    {
      return this.pagination(PRPCurrencies
                         ,CPRPQueryLib.currencies.items()
                         , {state: State.Active}
                         , countItems
                         , page
                        );

    }

    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              const objItem = await PRPCurrencies.create({  name: obj.name,
                                                            code: obj.code,
                                                            createAccount: account.uuid,
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
           const asset = await PRPCurrencies.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The currency is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPCurrencies.update({  name: obj.name,
                                                            code: obj.code,
                                                            updatedAt: new Date()
                                                         }, 
                                                         {where: {uuid: obj.uuid}},
                                                         { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async remove(account, obj)
    {
      try{
           const asset = await PRPCurrencies.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The currency is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPCurrencies.update({  state: State.Removed,
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