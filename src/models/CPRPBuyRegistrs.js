const PRPBuyRegistrs = require('./db').PRPBuyRegistrs;
import {State} from './enums/State';
import CPRPQuery from './CPRPQuery';
import CPRPQueryLib from './CPRPQueryLib';
import {countRecordsOnPage}  from '../config/config';
import { v4 as uuid } from 'uuid';
import CPRPSaleRegistrs from './CPRPSaleRegistrs';
import CPRPCommonHelper from '../helpers/CPRPCommonHelper';




const sequelize = require('./db').sequelize;
const Sequelize = require('./db').Sequelize;
const Op = Sequelize.Op;




export default class CPRPBuyRegistrs extends CPRPQuery
{
    constructor()
    {
      super();
    }

    async convertData(records)
    {
       return records.map((obj)=>{
          obj.link_address = CPRPCommonHelper.pathByProvider(obj.resource_data.provider_data.name, obj.resource_data.resource);
          return obj;});
    }

    async get(uuid)
    {
      return this.request(PRPBuyRegistrs
                         ,CPRPQueryLib.buy_registrs.items()
                         ,{uuid: uuid}
                        );

    }
    async list(page, countItems)
    {
      return this.pagination(PRPBuyRegistrs
                         ,CPRPQueryLib.buy_registrs.items()
                         , {state: State.Active}
                         , countItems
                         , page
                         , this.convertData
                        );

    }


    async createTrn(t, obj)
    {
        return await PRPBuyRegistrs.create({  reg_number: obj.reg_number,
                                               dateReg: obj.dateReg,
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
                                               createdAt: new Date(),
                                               updatedAt: new Date()
                                             }, { transaction: t });
    }


    async createBySpecTrn(t, document, spec, objSpecInfoItem)
    {
        const objReg = await this.createTrn(t, {  reg_number: uuid(),
                                                  dateReg: new Date(),
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
       if(objSpecInfoItem.source_registr !== undefined)
          await (new CPRPSaleRegistrs()).moveItemTrn(t, document, spec, objSpecInfoItem.source_registr, objSpecInfoItem);
       return objReg;
    }

}