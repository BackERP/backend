const PRPSaleDocuments = require('./db').PRPSaleDocuments;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';
import DefaultSetting from './config/DefaultSetting';
import SaleDocumentStates from './enums/SaleDocumentStates';
import CPRPAssetsResources from './CPRPAssetsResources';
import CPRPSaleDocumentSpecifications from './CPRPSaleDocumentSpecifications';
import { v4 as uuid } from 'uuid';
import CPRPSaleRegistrs from './CPRPSaleRegistrs';
import CPRPCommonHelper from '../helpers/CPRPCommonHelper';
import CPRPSubjectAttributes from './CPRPSubjectAttributes';






const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;


    const defaultLink = async (records)=>
    {
       const result  = (await (new CPRPAssetsResources()).getAllDefault());
       if(!result.ok)
          throw new Error(result.error);

       const resources = result.data;

      return records.map((doc)=>{
         const resource = resources.find((r)=>r.asset_data.uuid == doc.asset_data.uuid);
         if(resource === undefined)
           return doc;
         doc.link_address = (resource.link_address !== '')?resource.link_address:doc.link_address;
         return doc;
      }); 
    }
    const addSubjectAttribute = async (records)=>
    {
       const result  = (await (new CPRPSubjectAttributes()).all());
       if(!result.ok)
          throw new Error(result.error);

       const attributes = result.data;
       
      return records.map((doc)=>{
//         console.log('doc', doc);
         doc.subject_data.attributes = attributes.filter((attr)=>attr.subject_data.uuid == doc.subject_data.uuid);
         return doc;
      }); 
    }


export default class CPRPSaleDocuments extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async convertData(records)
    {

       const findDocument = (records, uuid)=>
       {
         const list = records.filter((obj)=>obj.uuid == uuid);
         return list.length > 0? list[0]: null;
       }
       const isPhysic = (reg)=>
       {
          return reg.resource_data.provider_data.uuid == DefaultSetting.physicProvider;
       }

       const newRecords = [];
       const result  = (await (new CPRPSaleRegistrs()).listOpened(-1));
       if(!result.ok)
          throw new Error(result.error);

       const registrs = result.data;

       let currentDocument = '';
       let doc = null;
       for(const reg of registrs)
       {
          if(doc == null || doc.uuid !== reg.reg_document_data.uuid)
          {
             if(doc !== null)
               newRecords.push(doc);
             doc = findDocument(records, reg.reg_document_data.uuid);
             if(doc == null)
               continue;
            doc.registrs = [];
            doc.link_address = '';
            doc.asset_data = reg.asset_data; 
            doc.offer_quantity = 0.0;
            doc.quantity = 0.0;
            doc.price = 0.0;
            doc.offer_sum = 0.0;
            doc.current_sum = 0.0;


            doc.physic_price = 0.0;
            doc.physic_quantity = 0.0;
            doc.offer_physic_quantity = 0.0;
            doc.offer_physic_sum = 0.0;
            doc.current_physic_sum = 0.0;
          }
          doc.registrs.push(reg);
          const link_address = CPRPCommonHelper.pathByProvider(reg.resource_data.provider_data.name, reg.resource_data.resource);
          if(link_address !== '' && doc.link_address =='')
             doc.link_address = link_address;

          if(isPhysic(reg))
          {
             doc.physic_price = reg.price;
             doc.physic_quantity =  reg.quantity;
             doc.current_physic_sum = reg.sum;
             doc.offer_physic_quantity = reg.reg_specification_data.quantity;
             doc.offer_physic_sum = reg.reg_specification_data.sum;
          }
          else
          {
             doc.price = reg.price;
             doc.quantity =  reg.quantity;
             doc.current_sum = reg.sum;
             doc.offer_quantity = reg.reg_specification_data.quantity;
             doc.offer_sum = reg.reg_specification_data.sum;
          }
       }
       if(doc !== null)
          newRecords.push(doc);
       
       return await defaultLink(await addSubjectAttribute(newRecords));
    }

    async get(uuid)
    {
      return this.request(PRPSaleDocuments
                         ,CPRPQueryLib.sale_documents.items()
                         ,{uuid: uuid}
                        );

    }



    async list(page, countItems)
    {
      return this.pagination(PRPSaleDocuments
                         ,CPRPQueryLib.sale_documents.items()
                         , {state: State.Active}
                         , countItems
                         , page
                         ,this.convertData
                        );

    }

    async createTrn(t, account, obj)
    {
        return await PRPSaleDocuments.create({  number: obj.number,
                                                dateDoc: obj.dateDoc,
                                                subject:obj.subject,
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
           const asset = await PRPSaleDocuments.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The document is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPSaleDocuments.update({  number: obj.number,
                                                               dateDoc: obj.dateDoc,
                                                               subject:obj.subject,
                                                               sum:obj.sum,
                                                               currency:obj.currency,
                                                               documentState:obj.documentState,
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
           const asset = await PRPSaleDocuments.findOne({ where: { uuid: obj.uuid } });
           if(asset === null)
              return {ok:false, error:'The document is not found', data:null};

            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
    // your transactions
              const objItem = await PRPSaleDocuments.update({  state: State.Removed,
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
    async createByAsset(account, obj)
    {
      try{
           const objSpecInfo = await (new CPRPAssetsResources()).prepSpeInfo(account, obj.assetResource, obj.price, obj.quantity, obj.is_physic, obj.price_physic);
           const documentObject = {
                   number: uuid(),
                   dateDoc: new Date(),
                   subject:objSpecInfo.subject,
                   sum: objSpecInfo.sum,
                   currency:objSpecInfo.currency,
                   documentState:SaleDocumentStates.Done,
            }
            const data = await sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE}, async (t) => {
              const objDoc = await this.createTrn(t, account, documentObject);                                      
              const objSpecs = await (new CPRPSaleDocumentSpecifications()).createByInfoTrn(t, 
                                                                                           objDoc.uuid, 
                                                                                           documentObject.documentState == SaleDocumentStates.Done, 
                                                                                           objSpecInfo.items, 
                                                                                           account);
              return objDoc;
           });
           return {ok:true, data: {uuid: data.uuid}}
        }
        catch(err) {
            return {ok:false, error:err.message, data: null};
      }

    }

}