const PRPSubjectTypeContacts = require('./db').PRPSubjectTypeContacts;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';




const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPSubjectTypeContacts extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async get(uuid)
    {
      return this.request(PRPSubjectTypeContacts
                         ,CPRPQueryLib.subject_type_contacts.items()
                         ,{uuid: uuid}
                        );

    }
    async list(page, countItems)
    {
      return this.pagination(PRPSubjectTypeContacts
                         ,CPRPQueryLib.subject_type_contacts.items()
                         , {state: State.Active}
                         , countItems
                         , page
                        );
    }

    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              const objItem = await PRPSubjectTypeContacts.create({ name: obj.name,
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
           const asset = await PRPSubjectTypeContacts.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The type of contact is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPSubjectTypeContacts.update({  name: obj.name,
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
           const asset = await PRPSubjectTypeContacts.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The type of contact is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPSubjectTypeContacts.update({  state: State.Removed,
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