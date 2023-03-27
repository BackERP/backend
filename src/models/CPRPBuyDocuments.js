const PRPBuyDocuments = require('./db').PRPBuyDocuments;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';
import CPRPSaleRegistrs from './CPRPSaleRegistrs';
import CPRPBuyDocumentSpecifications from './CPRPBuyDocumentSpecifications';
import BuyDocumentStates from './enums/BuyDocumentStates';
import { v4 as uuid } from 'uuid';





const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPBuyDocuments extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async get(uuid)
    {
      return this.request(PRPBuyDocuments
                         ,CPRPQueryLib.buy_documents.items()
                         ,{uuid: uuid}
                        );

    }
    async list(page, countItems)
    {
      return this.pagination(PRPBuyDocuments
                         ,CPRPQueryLib.buy_documents.items()
                         , {state: State.Active}
                         , countItems
                         , page
                        );

    }

    async createTrn(t, account, obj)
    {
        return await PRPBuyDocuments.create({  number: obj.number,
                                               dateDoc: obj.dateDoc,
                                               email: obj.email,
                                               sum:obj.sum,
                                               currency:obj.currency,
                                               documentState:obj.documentState,
                                               createAccount: account.uuid,
                                               createdAt: new Date(),
                                               updatedAt: new Date()
                                            }, { transaction: t });

    }

    async create(account, obj)
    {
      try{
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
                return await this.createTrn(t, account, obj);                                      
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
           const asset = await PRPBuyDocuments.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The document is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPBuyDocuments.update({  number: obj.number,
                                                              dateDoc: obj.dateDoc,
                                                              email: obj.email,
                                                              sum: obj.sum,
                                                              currency: obj.currency,
                                                              documentState: obj.documentState,
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
           const asset = await PRPBuyDocuments.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The document is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPBuyDocuments.update({  state: State.Removed,
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

    async createByRegistr(obj)
    {
      try{
            const objSpecInfo = await (new CPRPSaleRegistrs()).prepSpeInfo(obj.email, obj.source_registr, obj.quantity);
            const documentObject = {
               number: uuid(),
               dateDoc: new Date(),
               email:obj.email,
               sum: objSpecInfo.sum,
               currency:objSpecInfo.currency,
               documentState:BuyDocumentStates.Paid,
            }
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              const objDoc = await this.createTrn(t, {uuid:undefined}, documentObject);                                      
              const objSpecs = await (new CPRPBuyDocumentSpecifications()).createByInfoTrn(t, 
                                                                                           objDoc.uuid, 
                                                                                           documentObject.documentState == BuyDocumentStates.Paid, 
                                                                                           objSpecInfo.items
                                                                                           );
              return {uuid: objDoc.uuid};
           });
           return {ok:true, data: {uuid: data.uuid}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }

//createByRegistr(req.account, {source_registr, quantity}))
}