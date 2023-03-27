const PRPPersons = require('./db').PRPPersons;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';




const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPPersons extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async get(uuid)
    {
      return this.request(PRPPersons
                         ,CPRPQueryLib.persons.items()
                         ,{uuid: uuid}
                        );

    }
    async list(page, countItems)
    {
      return this.pagination(PRPPersons
                         ,CPRPQueryLib.persons.items()
                         , {state: State.Active}
                         , countItems
                         , page
                        );
    }

    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              const objItem = await PRPPersons.create({  first_name: obj.first_name,
                                                          middle_name:obj.middle_name,
                                                          last_name:obj.last_name,
                                                          createAccount: account.uuid,
                                                          createdAt: new Date(),
                                                          updatedAt: new Date()
                                                       }, { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid, first_name: data.first_name, middle_name: data.middle_name, last_name: data.last_name}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async update(account, obj)
    {
      try{
           const asset = await PRPPersons.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The person is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPPersons.update({  first_name: obj.first_name,
                                                          middle_name:obj.middle_name,
                                                          last_name:obj.last_name,
                                                          updatedAt: new Date()
                                                      }, 
                                                      {where: {uuid: obj.uuid}},
                                                      { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid, first_name: data.first_name, middle_name: data.middle_name, last_name: data.last_name}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async remove(account, obj)
    {
      try{
           const asset = await PRPPersons.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The person is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPPersons.update({  state: State.Removed,
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