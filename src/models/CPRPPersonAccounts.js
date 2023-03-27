const PRPPersonAccounts = require('./db').PRPPersonAccounts;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';




const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPPersonAccounts extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async get(uuid)
    {
      return this.request(PRPPersonAccounts
                         ,CPRPQueryLib.person_accounts.items()
                         ,{uuid: uuid}
                        );

    }
    async list(page, countItems)
    {
      return this.pagination(PRPPersonAccounts
                         ,CPRPQueryLib.person_accounts.items()
                         , {state: State.Active}
                         , countItems
                         , page
                        );
    }

    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              const objItem = await PRPPersonAccounts.create({  person: obj.person,
                                                                account: account.uuid,
                                                                createdAt: new Date(),
                                                                updatedAt: new Date()
                                                              }, { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid, person: data.person_data, account: data.account_data}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async update(account, obj)
    {
      try{
           const asset = await PRPPersonAccounts.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The person account is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPPersonAccounts.update({  person: obj.person,
                                                                account: account.uuid,
                                                                updatedAt: new Date()
                                                             }, 
                                                             {where: {uuid: obj.uuid}},
                                                             { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid, person: data.person_data, account: data.account_data}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async remove(account, obj)
    {
      try{
           const asset = await PRPPersonAccounts.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The person account is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPPersonAccounts.update({  state: State.Removed,
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