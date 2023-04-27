
import CPRPAssetsResources from './CPRPAssetsResources';
import { map } from 'modern-async'


import {State} from './enums/State';
import {Books} from './enums/Books';

import {TypeDocuments, DocumentsStates} from './enums/TypeDocuments';
import CPRPDocuments from './CPRPDocuments';
import DefaultSetting from './config/DefaultSetting';
import CPRPBookRecords from './CPRPBookRecords';
import CPRPAssets from './CPRPAssets';
import CPRPDocumentSpecifications from './CPRPDocumentSpecifications';
import CPRPDocumentContacts from './CPRPDocumentContacts';



import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';




const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPOperations extends CPRPQuery
{
    constructor()
    {
      super();
    }

    async issueAll(account)
    {
      const resources = await (new CPRPAssetsResources).listDataByPinataIPFS();
      return await map(resources, async (resource)=>{
        return await this.issue(account, {asset:resource.asset_data.uuid, asset_resource_data: resource, asset_resource: resource.uuid, price: 0, quantity: 100, currency: DefaultSetting.currency});
      });

    }
//asset, asset_resource, price, quantity
    async detectResourceIPFS(asset)
    {
      const resources = await (new CPRPAssetsResources).resourcePinataIPFS(asset);

      if(resources.length == 0)
        return;                                                                       
      return resources[0];
    }
    async isIssued(asset)                                                                                 
    {                                             
       const rec = await (new CPRPBookRecords).findAssetInBooks([Books.issues], asset);
       return (rec.length > 0);                                                        
    }
    async issue(account, obj)
    {
      try{
          if(obj.quantity < 1)
           throw new Error('Quantity must be greater than zero');

       obj.currency = DefaultSetting.currency;
       if(obj.asset_resource_data == undefined)
       {
         obj.asset_resource_data = await this.detectResourceIPFS(obj.asset);
         if(obj.asset_resource_data == undefined)
            throw new Error('The asset has no IPFS implementation');
         obj.asset_resource = obj.asset_resource_data.uuid;
       }
//       throw new Error('isIssued');
       if(await this.isIssued(obj.asset))
          return this.returnData();


       return this.returnData(await (new CPRPDocuments).create(account,
                                               TypeDocuments.issue, 
                                               DocumentsStates.issue.completed, 
                                               undefined, //market
                                               obj.currency,
                                               {subject: DefaultSetting.subject,
                                                from_subject: obj.asset_resource_data.asset_data.subject_data.uuid,
                                                from_subject_specification: obj.asset_resource_data.asset_data.subject_specification_data.uuid,
                                               },
                                               [{asset: obj.asset, asset_resource: obj.asset_resource, price: obj.price, currency: obj.currency, quantity: obj.quantity}]
                                              ));
        }catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
    async incomeAll(account)
    {       
      const resources = await (new CPRPAssetsResources).listDataByPhysically();
      return await map(resources, async (resource)=>{
        return await this.income(account, {asset:resource.asset_data.uuid, asset_resource_data: resource, asset_resource: resource.uuid, price: 0, quantity: 1, currency: DefaultSetting.currency});
      });


    }
    async detectResourcePhysically(asset)
    {
      const resources = await (new CPRPAssetsResources).resourcePhysically(asset);
      if(resources.length == 0)
        return;                                                                       
      return resources[0];
    }
    async isIncomed(asset)                                                                                 
    {                                             
       const rec = await (new CPRPBookRecords).findAssetInBooks([Books.income], asset);
       return rec.length > 0;                                                        
    }

//asset, asset_resource, price, quantity
    async income(account, obj)
    {

      try{
          if(obj.quantity < 1)
             throw new Error('Quantity must be greater than zero');

       obj.currency = DefaultSetting.currency;
       if(obj.asset_resource_data == undefined)
       {
         obj.asset_resource_data = await this.detectResourcePhysically(obj.asset);
         if(obj.asset_resource_data == undefined)
            throw new Error('The asset has no Physically implementation');
         obj.asset_resource = obj.asset_resource_data.uuid;
       }
       if(await this.isIncomed(obj.asset))
          return this.returnData();
       return this.returnData(await (new CPRPDocuments).create(account,
                                               TypeDocuments.income_invoice, 
                                               DocumentsStates.income_invoice.completed,
                                               undefined, //market
                                               obj.currency,
                                               {subject: DefaultSetting.subject,
                                                from_subject: obj.asset_resource_data.asset_data.subject_data.uuid,
                                                from_subject_specification: obj.asset_resource_data.asset_data.subject_specification_data.uuid,
                                               },
                                               [{asset: obj.asset, asset_resource: obj.asset_resource, price: obj.price, currency: obj.currency, quantity: obj.quantity}]
                                              ));
        }catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }
//market, asset, price, currency, quantity, price_original
    async getAsset(asset)
    {
      const assets = await (new CPRPAssets).getData(asset);
      if(assets.length == 0)
        return;                                                                       
      return assets[0];

      
    }
    async makeOffer(account, obj)
    {
      try{
//           throw new Error('makeOffer');

          if(obj.price < 0)
             throw new Error('Price must be positive');

       const asset_data = await this.getAsset(obj.asset);
       if(asset_data == undefined)
          throw new Error('The asset is not found');

       const sources = await (new CPRPBookRecords).findAssetInBooks([Books.income, Books.issues], obj.asset);
       const spec = sources.map((rec)=>{
           return {
             asset: rec.asset_data.uuid,
             asset_resource: rec.asset_resource_data.uuid,
             price: (rec.book_data.uuid == Books.income)?obj.price_original:obj.price,
             currency: obj.currency,
             quantity: 1,
             control_record: rec.reg_specification_data.uuid,
//             issue: rec.reg_specification_data.uuid,
           }
       });
       return this.returnData(await (new CPRPDocuments).create(account,
                                               TypeDocuments.offer, 
                                               DocumentsStates.offer.completed,
                                               obj.market, //market
                                               obj.currency,
                                               {subject: DefaultSetting.subject,
                                                from_subject: asset_data.subject_data.uuid,
                                                from_subject_specification: asset_data.subject_specification_data.uuid,
                                               },
                                               spec
                                              ));
        }catch(err) {
            return {ok:false, error:err.message, data: null};
      }

       //Находим контольные ссылки на запись в реестре выпуска 
       //И создаем документ предложения

    }
//asset, quantity
    async makeReserve(account, obj)
    {
      try{
       const sources = await (new CPRPBookRecords).findAssetInBooks([Books.issues], obj.asset);
       return this.returnData(await (new CPRPBookRecords).moveRecords(account, Books.reserves, sources, quantity));
        }catch(err) {
            return {ok:false, error:err.message, data: null};
      }

    }
//asset, quantity
    async freeReserve(account, obj)
    {
      try{
       const sources = await (new CPRPBookRecords).findAssetInBooks([Books.reserves], obj.asset);
       return this.returnData(await (new CPRPBookRecords).backRecords(account, sources, quantity));
        }catch(err) {
            return {ok:false, error:err.message, data: null};
      }
    }

//sources - тут ссылка на offer, fullname, email, phone, order_number
//source
/*
   control_spc - offer
   quantity
   price
*/
    async findSuperControl(spec)
    {
       const controlspec = spec.reduce((cs, s)=>{
         if(s.control_record_data !== undefined && s.control_record_data !== null)
           cs.push(s.control_record_data.uuid);
           return cs;
         }, [])
      return await (new CPRPBookRecords).findByRegSpec(controlspec); // записи из оффера
    }
    async makeOrder(account, obj)
    {
      try{
      //Находим спецификациии исочника, 
      //issue_record - как контрол спецификации
      const control_spec = obj.sources.map((src)=>src.uuid);
      const controls_price = await (new CPRPBookRecords).findByRegSpec(control_spec); // записи из оффера
      const controls_quantity = await this.findSuperControl(controls_price);


      const issues = await (new CPRPBookRecords).getByRegSpec(sources);        //записи из выпуска
      const spec = obj.sources.map((src)=>{
        const control_price = controls_price.find((rec)=>src.uuid == rec.reg_specification_data.uuid);
        if(control_price == undefined)
          throw new Error('The source is wrong');
        if(control_price.price != src.price)
          throw new Error('The price is wrong');

        const control_quantity = controls_quantity.find((rec)=>control_price.control_record_data.uuid == rec.reg_specification_data.uuid);
        if(control_quantity != undefined)
        {
          if(src.quantity > control_quantity.quantity)
             throw new Error('Quantity more than available');
        }
           return {
             asset: control_price.asset_data.uuid,
             asset_resource: control_price.asset_resource_data.uuid,
             price: control_price.price,
             currency: control_price.currency,
             quantity: src.quantity,
             control_record: src.uuid,
             issue_record: control_quantity != undefined? control_quantity.reg_specification_data.uuid:undefined,
//             issue: rec.reg_specification_data.uuid,
           }

      });

       return this.returnData(await (new CPRPDocuments).create(account,
                                               TypeDocuments.order, 
                                               DocumentsStates.order.completed,
                                               undefined, //market
                                               obj.currency,
                                               {subject: DefaultSetting.subject,
                                                from_subject: DefaultSetting.subject,
                                                to_subject_data: {fullname:obj.fullname, email: obj.email, phone: obj.phone}
                                               },
                                               spec
                                              ));
        }catch(err) {
            return {ok:false, error:err.message, data: null};
      }

    }
//sources, quantity
    async makeReturn(account, obj)
    {
      try{
      const control_spec = obj.sources.map((src)=>src.uuid);
      const records = await (new CPRPBookRecords).findByRegSpec(control_spec); // записи из оффера
      const spec = obj.sources.map((src)=>{
        const record = records.find((rec)=>src.uuid == rec.reg_specification_data.uuid);
        if(record == undefined)
          throw new Error('Return is impossible');
        if(record.quantity < src.quantity)
          throw new Error('The specified amount cannot be returned.');
         return {
             asset: record.asset_data.uuid,
             asset_resource: record.asset_resource_data.uuid,
             price: record.price,
             currency: record.currency,
             quantity: src.quantity,
             move_to_record: record.master_record_data !== undefined && record.master_record !== null ? record.master_record_data.uuid: undefined
//             issue: rec.reg_specification_data.uuid,
         }

      });

       return this.returnData(await (new CPRPDocuments).create(account,
                                               TypeDocuments.returnAsset, 
                                               DocumentsStates.returnAsset.completed,
                                               undefined, //market
                                               obj.currency,
                                               {subject: DefaultSetting.subject,
                                                to_subject: DefaultSetting.subject,
                                               },
                                               spec
                                              ));
        }catch(err) {
            return {ok:false, error:err.message, data: null};
      }
      
    }

//order, sum, currency
    async getDoc(uuid)
    {
       const docs = await (new CPRPDocuments).getData(obj.order);
       if(docs.length == 0)
         return;
       return docs[0];
    }
    async makePaid(account, obj)
    {
      try{
      const document = await this.getDoc(obj.order);
      const  specifications = await (new CPRPBookRecords).findByDoc(document.uuid);
      const contacts = await (new CPRPDocumentContacts).listData(document.uuid);
      const spec = specifications.map((src)=>
      {
         return {
             asset: src.asset_data.uuid,
             asset_resource: src.asset_resource_data.uuid,
             price: src.price,
             currency: src.currency,
             quantity: src.quantity,
             source_record: src.uuid,
             issue_record: src.issue_record,
             control_record: src.reg_specification_data.uuid,
             isBreak: true, //рассыпать по штучно, чтоб у каждого был свой регистрационныйй номер

//             issue: rec.reg_specification_data.uuid,
         }

      });
       return this.returnData(await (new CPRPDocuments).create(account,
                                               TypeDocuments.paid, 
                                               DocumentsStates.paid.completed,
                                               undefined, //market
                                               obj.currency,
                                               {subject: document.subject_data.uuid,
                                                subject_specification: (document.subject_specification !== undefined && document.subject_specification !== null)?document.subject_specification_data.uuid:undefined,
                                                from_subject: document.from_subject_data.uuid,
                                                from_subject_specification: (document.from_subject_specification !== undefined && document.from_subject_specification !== null)?document.from_subject_specification.uuid:undefined,
                                                to_subject: document.to_subject_data.uuid,
                                                to_subject_specification: (document.to_subject_specification !== undefined && document.to_subject_specification !== null)?document.to_subject_specification.uuid:undefined,
                                               },
                                               spec,
                                               contacts
                                              ));

        }catch(err) {
            return {ok:false, error:err.message, data: null};
      }
      

    }

}