const PRPLogWebhook = require('./db').PRPLogWebhook;

import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';




const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPPayments extends CPRPQuery
{
    constructor()
    {
      super();
    }


    async logTrn(t,  obj)
    {
        return await PRPLogWebhook.create({  name: JSON.stringify(obj),
                                               createdAt: new Date(),
                                               updatedAt: new Date()
                                            }, { transaction: t });
    }

    async paid(obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
                return await this.logTrn(t, obj);                                      
             });
           return {ok:true, data: {uuid: data.uuid}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }

}