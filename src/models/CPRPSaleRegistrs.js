const PRPSaleRegistrs = require('./db').PRPSaleRegistrs;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';
import { v4 as uuid } from 'uuid';





const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPSaleRegistrs extends CPRPQuery
{
    constructor()
    {
      super();
    }
    async get(uuid)
    {
      return this.request(PRPSaleRegistrs
                         ,CPRPQueryLib.sale_registrs.items(['reg_document', 'ASC'])
                         ,{uuid: uuid}
                        );
    }
    async list(page, countItems)
    {
      return this.pagination(PRPSaleRegistrs
                         ,CPRPQueryLib.sale_registrs.items()
                         , {state: State.Active}
                         , countItems
                         , page
                        );

    }
    async listOpened(page, countItems)
    {
      return this.pagination(PRPSaleRegistrs
                            ,CPRPQueryLib.sale_registrs.items()
                            , {state: State.Active, next_registr:{[Op.eq]: null}}
                            , countItems
                            , page
                           );

    }


    async prepSpeInfo(email, source_registr, quantity)
    {

       const res = await this.get(source_registr);

       if(!res.ok) 
          throw new Error(res.error);
       if(res.data.length == 0) 
          throw new Error('The record of registr is not found');

       const registr =  res.data[0];

       if(registr.quantity < quantity)
          throw new Error('There is no such quantity');

       const specInfo = {
          currency:registr.currency_data.uuid,
          sum: 0.0,
          items:[{                                       
                   email: email,
                   asset: registr.asset_data.uuid,
                   assetProvider: registr.assetProvider_data.uuid, 
                   assetMetaDataProvider: registr.assetMetaDataProvider_data.uuid, 
                   resource: registr.resource_data.uuid,
                   metadataresource: registr.metadataresource_data.uuid,
                   currency:registr.currency_data.uuid,
                   price: registr.price,
                   src_quantity: registr.quantity,
                   quantity: quantity,
                   sum: registr.price*quantity,
                   source_registr: registr.uuid,

                }]
       }
       specInfo.sum = specInfo.items.reduce((total, obj)=>total + obj.sum, specInfo.sum);
       return specInfo;

    }
    async createTrn(t, account, obj)
    {
        return await PRPSaleRegistrs.create({  reg_number: obj.reg_number,
                                               dateReg: obj.dateReg,
                                               pev_registr: obj.pev_registr,
                                               next_registr: obj.next_registr,
                                               subject: obj.subject,
                                               asset: obj.asset,
                                               assetProvider: obj.assetProvider,
                                               assetMetaDataProvider: obj.assetMetaDataProvider,
                                               resource: obj.resource,
                                               metadataresource: obj.metadataresource,
                                               price: obj.price,
                                               quantity: obj.quantity,
                                               sum: obj.sum,
                                               currency: obj.currency,
                                               reg_document: obj.reg_document,
                                               reg_specification: obj.reg_specification,
                                               base_document: obj.base_document,
                                               base_specification: obj.base_specification,
                                               createAccount: account.uuid,
                                               createdAt: new Date(),
                                               updatedAt: new Date()
                                             }, { transaction: t });
    }

    async createBySpecTrn(t, document, spec, objSpecInfoItem, account)
    {
        return await this.createTrn(t, account, {  reg_number: uuid(),
                                                   dateReg: new Date(),
                                                   subject: objSpecInfoItem.subject,
                                                   asset: objSpecInfoItem.asset,
                                                   assetProvider: objSpecInfoItem.assetProvider,
                                                   assetMetaDataProvider: objSpecInfoItem.assetMetaDataProvider,
                                                   resource: objSpecInfoItem.resource,
                                                   metadataresource: objSpecInfoItem.metadataresource,
                                                   price: objSpecInfoItem.price,
                                                   quantity: objSpecInfoItem.quantity,
                                                   sum: objSpecInfoItem.sum,
                                                   currency: objSpecInfoItem.currency,
                                                   reg_document: document,
                                                   reg_specification: spec,
                                                });
    }

    async movementTrn(t, uuid, registr)
    {
       return await PRPSaleRegistrs.update({  next_registr: registr,
                                              updatedAt: new Date()
                                           }, 
                                           {where: {uuid: uuid}},
                                           { transaction: t });

    }
    async moveItemTrn(t, document, spec, source_registr, objSpecInfoItem)
    {
       const res = await this.get(source_registr);


       if(!res.ok) 
          throw new Error(res.error);
       if(res.data.length == 0) 
          throw new Error('The record of registr is not found');

       const registr =  res.data[0];

       if(registr.quantity < objSpecInfoItem.quantity)
          throw new Error('There is no such quantity');

       
        const newRegistr = await this.createTrn(t, {uuid:registr.createAccount_data.uuid}, 
                                                   { 
                                                      reg_number: registr.reg_number,
                                                      dateReg: new Date(),
                                                      subject: registr.subject_data.uuid,
                                                      asset: registr.asset_data.uuid,
                                                      assetProvider: registr.assetProvider_data.uuid,
                                                      assetMetaDataProvider: registr.assetMetaDataProvider_data.uuid,
                                                      resource: registr.resource_data.uuid,
                                                      metadataresource: registr.metadataresource_data.uuid,
                                                      price: registr.price,
                                                      quantity: registr.quantity - objSpecInfoItem.quantity,
                                                      sum: (registr.quantity - objSpecInfoItem.quantity) * registr.price,
                                                      currency: registr.currency_data.uuid,
                                                      reg_document: registr.reg_document_data.uuid,
                                                      reg_specification: registr.reg_specification_data.uuid,
                                                      pev_registr: registr.uuid,
                                                      base_document: document,
                                                      base_specification: spec,
                                                   });

      await this.movementTrn(t, registr.uuid, newRegistr.uuid);

      return newRegistr;
    }

}