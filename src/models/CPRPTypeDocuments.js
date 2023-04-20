
const PRPTypeDocuments = require('./db').PRPTypeDocuments;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';




const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPTypeDocuments extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async get(uuid)
    {
      return this.request(PRPTypeDocuments
                         ,CPRPQueryLib.type_documents.items()
                         ,{uuid: uuid}
                        );

    }
    async list(page, countItems)
    {
      return this.pagination(PRPTypeDocuments
                         ,CPRPQueryLib.type_documents.items()
                         , {state: State.Active}
                         , countItems
                         , page
                        );
    }

    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              const objItem = await PRPTypeDocuments.create({  name: obj.name,
                                                               subject:obj.subject,
                                                               book:obj.book,
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
           const asset = await PRPTypeDocuments.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The type of document is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPTypeDocuments.update({  name: obj.name,
                                                               subject:obj.subject,
                                                               book:obj.book,
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
           const asset = await PRPTypeDocuments.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The type of document is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPTypeDocuments.update({  state: State.Removed,
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