const PRPDocumentContacts = require('./db').PRPDocumentContacts;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';




const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPDocumentContacts extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async get(uuid)
    {
      return this.request(PRPDocumentContacts
                         ,CPRPQueryLib.document_contacts.items()
                         ,{uuid: uuid}
                        );

    }
    async list(page, countItems)
    {
      return this.pagination(PRPDocumentContacts
                         ,CPRPQueryLib.document_contacts.items()
                         , {state: State.Active}
                         , countItems
                         , page
                        );
    }

    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              const objItem = await PRPDocumentContacts.create({ document: obj.document,
                                                                 subject:obj.subject,
                                                                 subject_specification:obj.subject_specification,
                                                                 type:obj.type,
                                                                 contact:obj.contact,
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
           const asset = await PRPDocumentContacts.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The contact of document is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPDocumentContacts.update({ document: obj.document,
                                                                 subject:obj.subject,
                                                                 subject_specification:obj.subject_specification,
                                                                 type:obj.type,
                                                                 contact:obj.contact,
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
           const asset = await PRPDocumentContacts.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The contact of document is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPDocumentContacts.update({  state: State.Removed,
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