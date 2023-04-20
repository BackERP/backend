const PRPDocuments = require('./db').PRPDocuments;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';




const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPDocuments extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async get(uuid)
    {
      return this.request(PRPDocuments
                         ,CPRPQueryLib.documents.items()
                         ,{uuid: uuid}
                        );

    }
    async list(page, countItems)
    {
      return this.pagination(PRPDocuments
                         ,CPRPQueryLib.documents.items()
                         , {state: State.Active}
                         , countItems
                         , page
                        );
    }

    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              const objItem = await PRPDocuments.create({ type: obj.type, 
                                                          number: obj.number,
                                                          dateDoc: obj.dateDoc,
                                                          subject: obj.subject,
                                                          subject_specification: obj.subject_specification,
                                                          from_subject: obj.from_subject,
                                                          from_subject_specification: obj.from_subject_specification,
                                                          to_subject: obj.to_subject,
                                                          to_subject_specification: obj.to_subject_specification,
                                                          sum: obj.sum,
                                                          currency: obj.currency,
                                                          documentState: obj.documentState,
                                                          external_number: obj.external_number,
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
           const asset = await PRPDocuments.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The document is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPDocuments.update({ type: obj.type, 
                                                          number: obj.number,
                                                          dateDoc: obj.dateDoc,
                                                          subject: obj.subject,
                                                          subject_specification: obj.subject_specification,
                                                          from_subject: obj.from_subject,
                                                          from_subject_specification: obj.from_subject_specification,
                                                          to_subject: obj.to_subject,
                                                          to_subject_specification: obj.to_subject_specification,
                                                          sum: obj.sum,
                                                          currency: obj.currency,
                                                          documentState: obj.documentState,
                                                          external_number: obj.external_number,
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
           const asset = await PRPDocuments.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The document is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPDocuments.update({ state: State.Removed,
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