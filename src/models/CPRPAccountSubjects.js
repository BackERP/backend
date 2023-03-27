const PRPAccountSubjects = require('./db').PRPAccountSubjects;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';


const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPAccountSubjects extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async get(uuid)
    {
      return this.request(PRPAccountSubjects
                         ,CPRPQueryLib.account_subjects.items()
                         ,{uuid: uuid}
                        );

    }
    async list(account, page, countItems)
    {
      return this.pagination(PRPAccountSubjects
                         ,CPRPQueryLib.account_subjects.items()
                         , {account: account.uuid, state: State.Active}
                         , countItems
                         , page
                        );
    }

    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const account_subect = await PRPAccountSubjects.create({  account: account.uuid,
                                                                        name: obj.name, 
                                                                        subject: obj.subject,
                                                                        createdAt: new Date(),
                                                                        updatedAt: new Date()
                                                              }, { transaction: t });

              return account_subect;                                      
           });
           return {ok:true, data: {uuid: data.uuid, account: data.account_data, name: data.name, subject: data.subect_data}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async update(account, obj)
    {
      try{
           const asset = await PRPAccountSubjects.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The account subject is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPAccountSubjects.update({  account: account.uuid,
                                                                 name: obj.name, 
                                                                 subject: obj.subject,
                                                                 updatedAt: new Date()
                                                              }, 
                                                              {where: {uuid: obj.uuid}},
                                                              { transaction: t });

              return objItem;                                      
           });
           return {ok:true, data: {uuid: data.uuid, account: data.account_data, name: data.name, subject: data.subect_data}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async remove(account, obj)
    {
      try{
           const asset = await PRPAccountSubjects.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The account subject is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPAccountSubjects.update({  state: State.Removed,
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