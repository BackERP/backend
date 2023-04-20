
const PRPCountries = require('./db').PRPCountries;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';




const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPCountries extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async get(uuid)
    {
      return this.request(PRPCountries
                         ,CPRPQueryLib.countries.items()
                         ,{uuid: uuid}
                        );

    }
    async list(page, countItems)
    {
      return this.pagination(PRPCountries
                         ,CPRPQueryLib.countries.items()
                         , {state: State.Active}
                         , countItems
                         , page
                        );
    }

    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              const objItem = await PRPCountries.create({  name: obj.name,
                                                           alpha2:obj.alpha2,
                                                           alpha3:obj.alpha3,
                                                           numeric:obj.numeric,
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
           const asset = await PRPCountries.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The country is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPCountries.update({ name: obj.name,
                                                           alpha2:obj.alpha2,
                                                           alpha3:obj.alpha3,
                                                           numeric:obj.numeric,
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
           const asset = await PRPCountries.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The country is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPCountries.update({  state: State.Removed,
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