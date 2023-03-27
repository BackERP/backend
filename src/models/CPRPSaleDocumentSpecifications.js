const PRPSaleDocumentSpecifications = require('./db').PRPSaleDocumentSpecifications;
import { map } from 'modern-async'
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';
import CPRPSaleRegistrs from './CPRPSaleRegistrs';




const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPSaleDocumentSpecifications extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async get(uuid)
    {
      return this.request(PRPSaleDocumentSpecifications
                         ,CPRPQueryLib.sale_document_specifications.items()
                         ,{uuid: uuid}
                        );

    }
    async list(document, page, countItems)
    {
      return this.pagination(PRPSaleDocumentSpecifications
                         ,CPRPQueryLib.sale_document_specifications.items()
                         , {state: State.Active, document: document}
                         , countItems
                         , page
                        );

    }

    async createTrn(t, account, obj)
    {
        return await PRPSaleDocumentSpecifications.create({  document: obj.document,
                                                             asset: obj.asset,
                                                             assetProvider:obj.assetProvider,
                                                             assetMetaDataProvider:obj.assetMetaDataProvider,
                                                             resource:obj.resource,
                                                             metadataresource:obj.metadataresource,
                                                             quantity:obj.quantity,
                                                             price:obj.price,
                                                             sum:obj.sum,
                                                             currency:obj.currency,
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
           const asset = await PRPSaleDocumentSpecifications.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The position of specification is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPSaleDocumentSpecifications.update({  document: obj.document,
                                                                            asset: obj.asset,
                                                                            assetProvider:obj.assetProvider,
                                                                            assetMetaDataProvider:obj.assetMetaDataProvider,
                                                                            resource:obj.resource,
                                                                            metadataresource:obj.metadataresource,
                                                                            quantity:obj.quantity,
                                                                            price:obj.price,
                                                                            sum:obj.sum,
                                                                            currency:obj.currency,
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
           const asset = await PRPSaleDocumentSpecifications.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The position of specification is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPSaleDocumentSpecifications.update({  state: State.Removed,
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


    async createTrn(t, account, obj)
    {
        return await PRPSaleDocumentSpecifications.create({  document: obj.document,
                                                             asset: obj.asset,
                                                             assetProvider:obj.assetProvider,
                                                             assetMetaDataProvider:obj.assetMetaDataProvider,
                                                             resource:obj.resource,
                                                             metadataresource:obj.metadataresource,
                                                             quantity:obj.quantity,
                                                             price:obj.price,
                                                             sum:obj.sum,
                                                             currency:obj.currency,
                                                             createAccount: account.uuid,
                                                             createdAt: new Date(),
                                                             updatedAt: new Date()
                                                           }, { transaction: t });

     }
     async createByInfoTrn(t, document, isRegist, objSpecInfoItems, account)
     {
         return await map(objSpecInfoItems, async (itemSpc)=>{
            const objSpc = await this.createTrn(t, account, { document: document,
                                                             asset: itemSpc.asset,
                                                             assetProvider:itemSpc.assetProvider,
                                                             assetMetaDataProvider:itemSpc.assetMetaDataProvider,
                                                             resource:itemSpc.resource,
                                                             metadataresource:itemSpc.metadataresource,
                                                             quantity:itemSpc.quantity,
                                                             price:itemSpc.price,
                                                             sum:itemSpc.sum,
                                                             currency:itemSpc.currency,
                                                           }
                                              );
            if(isRegist)
               await (new CPRPSaleRegistrs).createBySpecTrn(t, document, objSpc.uuid, itemSpc, account);

            return objSpc;
         });
     }

}